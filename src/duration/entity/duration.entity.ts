import { AccountEntity } from "src/account/entity/account.entity";
import { SessionEntity } from "src/session/entity/session.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity({ name: "durations" })
export class DurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: number;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToMany(() => SessionEntity, (record) => record.duration)
  sessions: SessionEntity[]
}
