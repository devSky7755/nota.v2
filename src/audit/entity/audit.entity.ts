import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "audits" })
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "account_id" })
  accountId: number;

  @Column({ name: "uuid" })
  uuid: string;

  @Column({ name: "path" })
  path: string;

  @Column({ name: "path_id" })
  pathId: number;

  @Column()
  action: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
