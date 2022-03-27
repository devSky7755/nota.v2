import { ClientEntity } from "src/client/entity/client.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { UserEntity } from "src/user/entity/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

export interface PossibleAnswer {
  answer: string;
}

@Entity({ name: "notary_details" })
export class NotaryDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.notary_details, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: "com_name" })
  comName: string;

  @Column({ name: "notary_dob" })
  notaryDob: string;

  @Column({ name: "com_num" })
  comNum: string;

  @ManyToOne(() => StateEntity, state => state.com_s_notary_details)
  @JoinColumn({ name: 'com_state_id' })
  comState: StateEntity;

  @Column({ name: "com_date" })
  comDate: string;

  @Column({ name: "com_exp" })
  comExp: string;

  @Column({ name: "com_status" })
  comStatus: boolean;

  @Column({ name: "on_com_num" })
  onComNum: string;

  @Column({ name: "on_com_date" })
  onComDate: string;

  @Column({ name: "on_com_exp" })
  onComExp: string;

  @Column({ name: "on_com_status" })
  onComStatus: boolean;

  @Column({ name: "com_county" })
  comCounty: string;

  @Column({ name: "sig" })
  sig: string;

  @Column({ name: "stamp" })
  stamp: string;

  @Column({ name: "notary_cert" })
  notaryCert: string;

  @Column({ name: "on_notary_cert" })
  onNotaryCert: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
