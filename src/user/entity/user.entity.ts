import { AccountEntity } from "src/account/entity/account.entity";
import { PostEntity } from "src/post/entity/post.entity";
import { RecordEntity } from "src/record/entity/record.entity";
import { RoleEntity } from "src/role/entity/role.entity";
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
  ManyToOne,
} from "typeorm";
import { BlockJwtEntity } from "./block.jwt.entity";

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

  @OneToMany(() => AccUserJoinEntity, auj => auj.user)
  userAccJoins: AccUserJoinEntity[];

  @ManyToMany(() => AccountEntity)
  @JoinTable({
    name: 'acc_user_join',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
    },
  })
  accounts: AccountEntity[];

  @OneToMany(() => BlockJwtEntity, (bjwt) => bjwt.user, { cascade: true })
  bjwts: BlockJwtEntity[]
}


@Entity({ name: "acc_user_join" })
export class AccUserJoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.userAccJoins, { primary: true })
  @JoinColumn({ name: "user_id" })
  user: UserEntity

  @ManyToOne(() => AccountEntity, account => account.accUserJoins, { primary: true })
  @JoinColumn({ name: "account_id" })
  account: AccountEntity

  @ManyToOne(() => RoleEntity, role => role.roleAccUserJoins, { primary: true })
  @JoinColumn({ name: "role_id" })
  role: RoleEntity

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
