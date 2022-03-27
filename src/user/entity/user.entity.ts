import { IsNotEmpty } from "class-validator";
import { AccountEntity } from "src/account/entity/account.entity";
import { NotaryDetailEntity } from "src/notary_detail/entity/notary_detail.entity";
import { PostEntity } from "src/post/entity/post.entity";
import { RecordEntity } from "src/record/entity/record.entity";
import { RoleEntity } from "src/role/entity/role.entity";
import { SessionAssociateJoinEntity } from "src/session/entity/session.assoc.join.entity";
import { SessionEntity } from "src/session/entity/session.entity";
import { StateEntity } from "src/state/entity/state.entity";
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
  PrimaryColumn,
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

  @Column({ default: false })
  status: boolean;

  @OneToMany(() => UserDetailEntity, (detail) => detail.user, { cascade: true })
  userDetails: UserDetailEntity[];

  @Column({ name: "is_notary", default: true })
  isNotary: boolean;

  @OneToMany(() => NotaryDetailEntity, (notary) => notary.user, { cascade: true })
  notary_details: NotaryDetailEntity[]

  @Column()
  signature: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToMany(() => RecordEntity, (record) => record.user, { cascade: true })
  records: RecordEntity[]

  @ManyToMany(() => AccountEntity, (account) => account.users)
  @JoinTable({
    name: 'acc_user_join',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'accountId',
      referencedColumnName: 'id',
    },
  })
  accounts: AccountEntity[];

  @OneToMany(() => BlockJwtEntity, (bjwt) => bjwt.user, { cascade: true })
  bjwts: BlockJwtEntity[]

  @OneToMany(() => SessionEntity, (session) => session.user, { cascade: true })
  sessions: SessionEntity[]

  @OneToMany(() => SessionAssociateJoinEntity, (saj) => saj.user, { cascade: true })
  userAssocSessionJoins: SessionAssociateJoinEntity[]

  // @ManyToMany(() => SessionEntity)
  // sessionses: SessionEntity[];
}

@Entity({ name: "user_details" })
export class UserDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userDetails, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ name: "address_one" })
  addressOne: string;

  @Column({ name: "address_two" })
  addressTwo: string;

  @Column()
  city: string;

  @ManyToOne(() => StateEntity, (state) => state.s_user_details)
  @JoinColumn({ name: "state_id" })
  state: StateEntity

  @Column({ name: "zip_code" })
  zipCode: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}

@Entity({ name: "acc_user_join" })
export class AccUserJoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  userId: number

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  accountId: number

  @ManyToOne(() => RoleEntity, role => role.roleAccUserJoins, { nullable: true, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  @JoinColumn({ name: "role_id" })
  role: RoleEntity

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
