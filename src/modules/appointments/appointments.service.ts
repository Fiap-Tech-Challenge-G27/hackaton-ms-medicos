import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Doctor.name)
    private doctorModel: Model<DoctorDocument>,
  ) {}
  async create(doctorId: string, createAppointmentDto: CreateAppointmentDto) {
    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const createdAppointment = new this.appointmentModel({
      ...createAppointmentDto,
      doctor: doctorId,
    });

    return await createdAppointment.save();
  }

  async findAllByDoctorId(id: string) {
    const appointments = await this.appointmentModel.find({ doctor: id });

    return appointments;
  }

  async findAllByPatientId(id: string) {
    const appointments = await this.appointmentModel.find({ patientId: id });

    return appointments;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentModel.findOneAndUpdate(
      { _id: id },
      updateAppointmentDto,
      { new: false },
    );

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return await appointment.save();
  }

  async remove(id: string) {
    const appointmentExists = await this.appointmentModel.findOne({ _id: id });

    if (!appointmentExists) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointmentExists.status === 'accepted') {
      throw new BadRequestException(
        'You cannot delete an accepted appointment',
      );
    }

    return await appointmentExists.deleteOne();
  }
}
