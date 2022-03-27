import { ClientEntity } from "src/client/entity/client.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

export interface PossibleAnswer {
  answer: string;
}

@Entity({ name: "kbas" })
export class KbaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, client => client.kbas, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ name: "question" })
  question: string;

  @Column({ name: "possible_answers", type: "jsonb" })
  possibleAnswers: PossibleAnswer[];

  @Column({ name: "correct_answer" })
  correctAnswer: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
