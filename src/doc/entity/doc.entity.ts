import { SessionEntity } from "src/session/entity/session.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";

@Entity({ name: "docs" })
export class DocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "doc_title" })
  docTitle: string;

  @Column({ name: "doc_date" })
  docDate: string;

  @Column({ name: "doc_type" })
  docType: string;

  @Column({ name: "doc_url" })
  docUrl: string;

  @Column({ name: "destroy_date" })
  destroyDate: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToMany(() => SessionEntity, (session) => session.docs)
  sessions: SessionEntity[];
}
