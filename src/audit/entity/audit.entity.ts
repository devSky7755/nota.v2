import { AccountEntity } from "src/account/entity/account.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "audits" })
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (acc) => acc.audits)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity

  @Column({ name: "path" })
  path: string;

  @Column({ name: "path_id" })
  pathId: number;

  @Column()
  action: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
