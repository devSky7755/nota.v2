import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DocActionEntity } from "./doc.action.entity";
import { DocStatusEntity } from "./doc.status.entity";
import { SessionEntity } from "src/session/entity/session.entity";

@Entity({ name: "docs" })
export class DocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "doc_title" })
  docTitle: string;

  @Column({ name: "doc_date" })
  docDate: string;

  @ManyToOne(() => DocActionEntity, (da) => da.docs)
  @JoinColumn({ name: 'doc_action_id' })
  action: DocActionEntity;

  @ManyToOne(() => DocStatusEntity, (ds) => ds.docs)
  @JoinColumn({ name: 'doc_state_id' })
  status: DocStatusEntity;

  @Column({ name: "doc_type" })
  docType: string;

  @Column({ name: "doc_url" })
  docUrl: string;

  @Column({ name: "destroy_date" })
  destroyDate: string;

  @Column({ name: "needs_notary" })
  needsNotary: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToMany(() => SessionEntity, (session) => session.docs)
  sessions: SessionEntity[];
}
