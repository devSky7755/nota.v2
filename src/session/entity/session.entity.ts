import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";

import { AccountEntity } from "src/account/entity/account.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { WitnessEntity } from "src/witness/entity/witness.entity";
import { DocEntity } from "src/doc/entity/doc.entity";
import { SessionTypeEntity } from "./session.types.entity";
import { SessionStatusEntity } from "./session.status.entity";
import { NotarySessionTypeEntity } from "./notary.session.type.entity";
import { SessionAssociateJoinEntity } from "./session.assoc.join.entity";
import { DurationEntity } from "src/duration/entity/duration.entity";
import { SessionTokenEntity } from "./session.token.entity";

@Entity({ name: "sessions" })
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "hash", unique: true })
  hash: string;

  @ManyToOne(() => AccountEntity, (account) => account.sessions)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: "date_time" })
  dateTime: string;

  @ManyToOne(() => DurationEntity, (dura) => dura.sessions)
  @JoinColumn({ name: 'duration_id' })
  duration: DurationEntity;

  @Column({ name: "docs_num" })
  docsNum: number;

  @ManyToOne(() => SessionTypeEntity, (st) => st.sessions)
  @JoinColumn({ name: 'type_id' })
  sessionType: SessionTypeEntity;

  @OneToOne(() => SessionStatusEntity, (ss) => ss.session)
  @JoinColumn({ name: 'status_id' })
  sessionStatus: SessionStatusEntity;

  @ManyToOne(() => NotarySessionTypeEntity, (nst) => nst.sessions)
  @JoinColumn({ name: 'notary_type_id' })
  notarySessionType: NotarySessionTypeEntity;

  @Column({ name: "case_matter_num" })
  caseMatterNum: string;

  @Column({ name: "video_url" })
  videoUrl: string;

  @ManyToMany(() => ClientEntity, (client) => client.sessions)
  @JoinTable({
    name: 'session_client_join',
    joinColumn: {
      name: 'sessionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'clientId',
      referencedColumnName: 'id',
    },
  })
  clients: ClientEntity[];

  @ManyToMany(() => WitnessEntity, (witness) => witness.sessions)
  @JoinTable({
    name: 'session_witness_join',
    joinColumn: {
      name: 'session_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'witness_id',
      referencedColumnName: 'id',
    },
  })
  witnesses: WitnessEntity[];

  @OneToMany(() => SessionAssociateJoinEntity, saj => saj.session)
  sessionAssociateJoins: SessionAssociateJoinEntity[];

  // @ManyToMany(() => AssociateEntity, (associate) => associate.sessions)
  // @JoinTable({
  //   name: 'session_associate_join',
  //   joinColumn: {
  //     name: 'session_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'associate_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // associates: AssociateEntity[];

  // @ManyToMany(() => UserEntity, (user) => user.sessionses)
  // @JoinTable({
  //   name: 'session_associate_join',
  //   joinColumn: {
  //     name: 'session_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // users: UserEntity[];

  @ManyToMany(() => DocEntity, (doc) => doc.sessions)
  @JoinTable({
    name: 'session_doc_join',
    joinColumn: {
      name: 'session_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'doc_id',
      referencedColumnName: 'id',
    },
  })
  docs: DocEntity[];

  @OneToMany(() => SessionTokenEntity, token => token.session)
  tokens: SessionTokenEntity[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}