import { IsEnum } from 'class-validator';

enum AppointmentType {
  REMOTE = 'remote',
  PRESENTIAL = 'presential',
}

enum AppointmentStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  FINISHED = 'finished',
}
export class CreateAppointmentDto {
  @IsEnum(AppointmentType)
  type: string;
  @IsEnum(AppointmentStatus)
  status: string;
  startTime: Date;
  endTime: Date;
}
