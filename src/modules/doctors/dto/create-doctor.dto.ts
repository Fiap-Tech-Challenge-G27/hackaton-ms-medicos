import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class AddressDto {
  @ApiProperty()
  street: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zip: string;
}

export class CreateDoctorDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(8)
  password: string;
  @ApiProperty()
  crm: string;
  @ApiProperty()
  specialties: string;
  @ApiProperty()
  address: AddressDto;
}
