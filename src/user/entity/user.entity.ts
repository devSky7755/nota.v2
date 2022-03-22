import { AccountEntity } from "src/account/entity/account.entity";
import { PostEntity } from "src/post/entity/post.entity";
import { RecordEntity } from "src/record/entity/record.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ name: "is_notary", default: true })
  isNotary: boolean;

  @Column()
  signature: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToMany(() => RecordEntity, (record) => record.user)
  records: RecordEntity[]

  @ManyToMany(() => AccountEntity)
  @JoinTable({name: 'acc_user_join'})
  accounts: AccountEntity[];
}
