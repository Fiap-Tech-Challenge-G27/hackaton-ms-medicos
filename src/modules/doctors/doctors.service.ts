import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';
import { AddressEntity, DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}
  create(createDoctorDto: CreateDoctorDto) {
    const createdDoctor = new this.doctorModel(createDoctorDto);

    return createdDoctor.save();
  }

  findAll() {
    return `This action returns all doctors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  async findByParam(param: string): Promise<DoctorEntity> {
    const doctor = await this.doctorModel.findOne({
      $or: [{ email: param }, { crm: param }],
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const doctorEntity = new DoctorEntity(
      doctor.name,
      doctor.email,
      doctor.crm,
      doctor.specialties,
      doctor.phone,
      new AddressEntity(
        doctor.address.street,
        doctor.address.number,
        doctor.address.city,
        doctor.address.state,
        doctor.address.zip,
      ),
    );

    doctorEntity.id = doctor._id.toString();
    doctorEntity.password = doctor.password;

    return doctorEntity;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
