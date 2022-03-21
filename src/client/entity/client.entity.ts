import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clients" })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "middle_name" })
  middleName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column()
  suffix: string;

  @Column({ name: "address_one" })
  addressOne: string;

  @Column({ name: "address_two" })
  addressTwo: string;

  @Column()
  city: string;

  @Column()
  state: number;

  @Column({ name: "zip_code" })
  zipCode: string;

  @Column({ name: "billing_address_one" })
  billingAddressOne: string;

  @Column({ name: "billing_address_two" })
  billingAddressTwo: string;

  @Column({ name: "billing_city" })
  billingCity: string;

  @Column({ name: "billing_state" })
  billingState: string;

  @Column({ name: "billing_zip_code" })
  billingZipcode: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ name: "send_sms" })
  sendSms: boolean;

  @Column({ name: "send_email" })
  sendEmail: boolean;

  @Column()
  dob: string;

  @Column()
  ssn: string;

  @Column({ name: "dl_num" })
  dlNum: string;

  @Column({ name: "dl_state" })
  dlState: string;

  @Column({ name: "dl_exp" })
  dlExp: string;

  @Column({ name: "dl_image" })
  dlImage: string;

  @Column()
  signature: string;
}
