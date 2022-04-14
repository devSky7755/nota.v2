import { AccountEntity } from "src/account/entity/account.entity";
import { AssociateEntity } from "src/associate/entity/associate.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { WitnessEntity } from "src/witness/entity/witness.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Double,
} from "typeorm";

@Entity({ name: "timezones" })
export class TimezoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "value" })
  value: string;

  @Column({ name: "abbr" })
  abbr: string;

  @Column({ name: "offset", type: 'float', scale: 1 })
  offset: number;

  @Column({ name: "isdst" })
  isdst: boolean;

  @Column({ name: "text" })
  text: string;

  @Column({ name: "utc", type: "jsonb" })
  utc: string[];

  @OneToMany(() => UserEntity, user => user.timezone)
  users: UserEntity[]

  @OneToMany(() => AccountEntity, account => account.timezone)
  accounts: AccountEntity[]

  @OneToMany(() => ClientEntity, client => client.timezone)
  clients: ClientEntity[]

  @OneToMany(() => WitnessEntity, witness => witness.timezone)
  witnesses: WitnessEntity[]

  @OneToMany(() => AssociateEntity, associate => associate.timezone)
  associates: AssociateEntity[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
