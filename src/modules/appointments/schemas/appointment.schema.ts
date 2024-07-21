import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaT } from 'mongoose';
import { Doctor } from 'src/modules/doctors/schemas/doctor.schema';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true })
  type: string;
  @Prop({ required: true, default: 'available' })
  status: string;
  @Prop({ required: true, type: Date })
  startTime: Date;
  @Prop({ required: true, type: Date })
  endTime: Date;
  @Prop({ required: true, type: SchemaT.Types.ObjectId, ref: Doctor.name })
  doctor: Doctor;
  @Prop()
  patientId: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
