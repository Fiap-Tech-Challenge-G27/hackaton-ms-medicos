import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorsService } from '../doctors/doctors.service';
import { DoctorEntity } from '../doctors/entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dto/authentication.dto';

@Injectable()
export class AuthService {
  constructor(
    private doctorsService: DoctorsService,
    private jwtService: JwtService,
  ) {}
  async validateDoctor(
    username: string,
    password: string,
  ): Promise<DoctorEntity> {
    const doctor = await this.doctorsService.findByParam(username);

    if (!doctor && doctor.password !== password) {
      throw new BadRequestException('Invalid user');
    }

    delete doctor.password;

    return doctor;
  }

  async login(authenticationDto: AuthenticationDto) {
    const doctor = await this.validateDoctor(
      authenticationDto.username,
      authenticationDto.password,
    );

    return {
      access_token: this.jwtService.sign({ ...doctor }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
