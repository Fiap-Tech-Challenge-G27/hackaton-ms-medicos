export class AddressEntity {
  street: string;
  number: number;
  city: string;
  state: string;
  zip: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
export class DoctorEntity {
  id?: string;
  name: string;
  phone: string;
  email: string;
  crm: string;
  specialties: string[];
  password?: string;
  address: AddressEntity;

  constructor(partial: Partial<DoctorEntity>) {
    Object.assign(this, partial);
  }
}
