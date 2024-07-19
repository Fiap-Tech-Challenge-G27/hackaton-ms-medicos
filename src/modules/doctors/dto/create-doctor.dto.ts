import { ApiProperty } from '@nestjs/swagger';

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
  email: string;
  @ApiProperty()
  crm: string;
  @ApiProperty()
  specialties: string;
  @ApiProperty()
  address: AddressDto;
}
