import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { DocEntity } from "./doc.entity";

@Entity({ name: "doc_actions" })
export class DocActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "status" })
  status: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToMany(() => DocEntity, (doc) => doc.action)
  docs: DocEntity[];
}
