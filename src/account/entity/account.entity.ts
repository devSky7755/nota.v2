import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";
import { AuditEntity } from "src/audit/entity/audit.entity";
import { BillingEntity } from "src/billing/entity/billing.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { SessionEntity } from "src/session/entity/session.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from "typeorm";
import { AccountStatusEntity } from "./account.status.entity";

@Entity({ name: "accounts" })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: "company_name" })
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

  @ManyToOne(() => AccTypeEntity, (at) => at.accounts)
  @JoinColumn({ name: 'acc_type_id' })
  accType: AccTypeEntity;

  @Column({ name: "qb_account_number" })
  qbAccountNumber: string;

  @Column({ name: "customer_id", nullable: true })
  qbCustomerId: number;

  @Column({ name: "brand_color" })
  brandColor: string;

  @Column()
  logo: string;

  @Column({ name: "white_label" })
  whiteLabel: boolean;

  @ManyToOne(() => AccountStatusEntity, (record) => record.accounts)
  @JoinColumn({ name: "status_id" })
  status: AccountStatusEntity

  @Column({ name: "closed_date" })
  closedDate: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(() => StateEntity, (state) => state.s_accounts)
  @JoinColumn({ name: "state_id" })
  state: StateEntity

  @ManyToOne(() => StateEntity, (state) => state.billing_s_accounts)
  @JoinColumn({ name: "billing_state_id" })
  billingState: StateEntity;

  @ManyToMany(() => UserEntity, (user) => user.accounts)
  users: UserEntity[];

  @ManyToMany(() => ClientEntity, (user) => user.accounts)
  clients: ClientEntity[];

  @OneToMany(() => BillingEntity, (bill) => bill.account)
  billings: BillingEntity[]

  @OneToMany(() => SessionEntity, (session) => session.account)
  sessions: SessionEntity[]

  @OneToMany(() => AuditEntity, (audit) => audit.account)
  audits: AuditEntity[]
}
