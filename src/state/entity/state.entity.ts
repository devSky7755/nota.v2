import { AccountEntity } from "src/account/entity/account.entity";
import { AssociateEntity } from "src/associate/entity/associate.entity";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity({ name: "states" })
export class StateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "state", unique: true })
  state: string;

  @Column({ name: "abbr", unique: true })
  abbr: string;

  @Column({ name: "status" })
  status: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToMany(() => AccountEntity, (account) => account.state)
  s_accounts: AccountEntity[]

  @OneToMany(() => AccountEntity, (account) => account.billingState)
  billing_s_accounts: AccountEntity[]

  @OneToMany(() => AssociateEntity, (associate) => associate.state)
  s_associates: AssociateEntity[]
}
