import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
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
  async create(createDoctorDto: CreateDoctorDto) {
    const passwordEncrypted = await hash(createDoctorDto.password, 10);

    console.log(passwordEncrypted);

    const createdDoctor = new this.doctorModel({
      name: createDoctorDto.name,
      email: createDoctorDto.email,
      crm: createDoctorDto.crm,
      specialties: createDoctorDto.specialties,
      phone: createDoctorDto.phone,
      password: passwordEncrypted,
      address: {
        street: createDoctorDto.address.street,
        number: createDoctorDto.address.number,
        city: createDoctorDto.address.city,
        state: createDoctorDto.address.state,
        zip: createDoctorDto.address.zip,
      },
    });

    return await createdDoctor.save();
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

    const doctorEntity = new DoctorEntity({
      name: doctor.name,
      email: doctor.email,
      crm: doctor.crm,
      specialties: doctor.specialties,
      phone: doctor.phone,
      address: new AddressEntity({
        street: doctor.address.street,
        number: doctor.address.number,
        city: doctor.address.city,
        state: doctor.address.state,
        zip: doctor.address.zip,
      }),
    });

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
