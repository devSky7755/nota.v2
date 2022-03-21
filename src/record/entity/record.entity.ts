import { UserEntity } from "src/user/entity/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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
  docDate: Date;

  @Column()
  docTitle: string;

  @Column()
  principleName: string;

  @Column()
  principleAddress: string;

  @Column()
  principlePhone: string;

  @Column()
  principleSig: string;

  @Column()
  witnessName: string;

  @Column()
  witnessAddress: string;

  @Column()
  dlNum: string;

  @Column()
  dlExp: string;

  @Column()
  fee: number;

  @Column()
  isOnline: boolean;

  @Column({ default: new Date() })
  updatedAt: Date;

  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
