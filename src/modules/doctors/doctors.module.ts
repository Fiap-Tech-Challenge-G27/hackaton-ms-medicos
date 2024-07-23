import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './schemas/doctor.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    CacheModule.register({
      store: 'memory',
    }),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
