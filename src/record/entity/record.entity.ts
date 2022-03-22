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

  @Column()
  notary_date: string;

  @Column()
  notary_county: string;

  @Column()
  doc_date: Date;

  @Column()
  doc_title: string;

  @Column()
  principle_name: string;

  @Column()
  principle_address: string;

  @Column()
  principle_phone: string;

  @Column()
  principle_sig: string;

  @Column()
  witness_name: string;

  @Column()
  witness_address: string;

  @Column()
  dl_num: string;

  @Column()
  dl_exp: string;

  @Column()
  dl_img: string;

  @Column()
  fee: number;

  @Column()
  is_online: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.records)
  user: UserEntity
}
