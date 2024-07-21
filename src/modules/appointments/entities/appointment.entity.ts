import { DoctorEntity } from 'src/modules/doctors/entities/doctor.entity';

export class AppointmentEntity {
  id?: string;
  type: string;
  status: string;
  startTime: Date;
  endTime: Date;
  doctor: DoctorEntity;

  constructor(partial: Partial<AppointmentEntity>) {
    Object.assign(this, partial);
  }
}
