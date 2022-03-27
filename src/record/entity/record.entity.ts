import { MethodEntity } from "src/method/entity/method.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { TypeEntity } from "src/type/entity/type.entity";
import { UserEntity } from "src/user/entity/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "records" })
export class RecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column({ name: 'notary_date' })
  notaryDate: string;

  @Column({ name: 'notary_county' })
  notaryCounty: string;

  @Column({ name: 'doc_date' })
  docDate: Date;

  @Column({ name: 'doc_title' })
  docTitle: string;

  @Column({ name: 'principle_name' })
  principleName: string;

  @Column({ name: 'principle_address' })
  principleAddress: string;

  @Column({ name: 'principle_phone' })
  principlePhone: string;

  @Column({ name: 'principle_sig' })
  principleSig: string;

  @Column({ name: 'witness_name' })
  witnessName: string;

  @Column({ name: 'witness_address' })
  witnessAddress: string;

  @ManyToOne(() => TypeEntity, (type) => type.records)
  @JoinColumn({ name: 'type_of_notarizations_id' })
  typeOfNotarization: TypeEntity;

  @ManyToOne(() => MethodEntity, (method) => method.records)
  @JoinColumn({ name: 'method_of_id' })
  methodOfId: MethodEntity;

  @Column({ name: 'dl_num' })
  dlNum: string;

  @Column({ name: 'dl_exp' })
  dlExp: string;

  @ManyToOne(() => StateEntity, (state) => state.dl_s_records)
  @JoinColumn({ name: 'dl_state_id' })
  dlState: StateEntity;

  @Column({ name: 'dl_img' })
  dlImg: string;

  @Column()
  fee: number;

  @Column({ name: 'is_online' })
  isOnline: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.records)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
