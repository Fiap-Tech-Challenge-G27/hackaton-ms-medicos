import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEmail, MinLength } from 'class-validator';

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
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one specialty is required' })
  specialties: string;
  @ApiProperty()
  address: AddressDto;
}
