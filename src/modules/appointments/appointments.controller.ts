import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createAppointmentDto: CreateAppointmentDto) {
    const { id } = req.user.data;
    return this.appointmentsService.create(id, createAppointmentDto);
  }

  @Get('doctor')
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const { id } = req.user.data;

    return this.appointmentsService.findAllByDoctorId(id);
  }

  @Get('patient/:id')
  findByPatientId(@Param('id') id: string) {
    return this.appointmentsService.findAllByPatientId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
