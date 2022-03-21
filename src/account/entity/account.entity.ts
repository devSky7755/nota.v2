import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "accounts" })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  companyName: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "address_one" })
  addressOne: string;

  @Column({ name: "address_two" })
  addressTwo: string;

  @Column()
  city: string;

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
  billingZipCode: string;

  @Column()
  email: string;

  @Column({ name: "billing_email" })
  billingEmail: string;

  @Column()
  phone: string;

  @Column({ name: "billing_phone" })
  billingPhone: string;

  @Column({ name: "account_type_id" })
  accountType: number;

  @Column({ name: "qb_account_number" })
  qbAccountNumber: string;

  @Column({ name: "brand_color" })
  brandColor: string;

  @Column()
  logo: string;

  @Column({ name: "white_label" })
  whiteLabel: boolean;

  @Column()
  status: number;

  @Column({ name: "closed_date" })
  closedDate: string;

  @Column({ default: new Date(), name: "created_at" })
  createdAt: Date;

  @Column({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
}
