export class AddressEntity {
  street: string;
  number: number;
  city: string;
  state: string;
  zip: string;

  constructor(
    street: string,
    number: number,
    city: string,
    state: string,
    zip: string,
  ) {
    this.street = street;
    this.number = number;
    this.city = city;
    this.state = state;
    this.zip = zip;
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

  constructor(
    name: string,
    email: string,
    crm: string,
    specialties: string[],
    phone: string,
    address: AddressEntity,
  ) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.specialties = specialties;
    this.crm = crm;
    this.address = address;
  }
}
