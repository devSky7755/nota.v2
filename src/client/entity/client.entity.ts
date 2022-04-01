import { SessionEntity } from "src/session/entity/session.entity";
import { SessionClientJoinEntity } from "src/session/entity/session.client.join.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinColumn, JoinTable, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { StateEntity } from "src/state/entity/state.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { IsNotEmpty } from "class-validator";
import { KbaEntity } from "src/kba/entity/kba.entity";

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

  @ManyToOne(() => StateEntity, (state) => state.s_clients)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity

  @Column({ name: "zip_code" })
  zipCode: string;

  @Column({ name: "billing_address_one" })
  billingAddressOne: string;

  @Column({ name: "billing_address_two" })
  billingAddressTwo: string;

  @Column({ name: "billing_city" })
  billingCity: string;

  @ManyToOne(() => StateEntity, (state) => state.billing_s_clients)
  @JoinColumn({ name: 'billing_state_id' })
  billingState: StateEntity

  @Column({ name: "billing_zip_code" })
  billingZipCode: string;

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

  @ManyToOne(() => StateEntity, (state) => state.dl_s_clients)
  @JoinColumn({ name: 'dl_state_id' })
  dlState: StateEntity

  @Column({ name: "dl_exp" })
  dlExp: string;

  @Column({ name: "dl_image" })
  dlImage: string;

  @Column()
  signature: string;

  @ManyToMany(() => AccountEntity, (account) => account.clients)
  @JoinTable({
    name: 'client_account_join',
    joinColumn: {
      name: 'clientId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'accountId',
      referencedColumnName: 'id',
    },
  })
  accounts: AccountEntity[];

  @ManyToMany(() => SessionEntity, (session) => session.clients)
  sessions: SessionEntity[];

  @OneToMany(() => KbaEntity, (kba) => kba.client, { cascade: true })
  kbas: KbaEntity[];
}

@Entity({ name: "client_account_join" })
export class ClientAccountJoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  clientId: number

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  accountId: number

  @Column({ name: "acc_num" })
  accountNumber: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
