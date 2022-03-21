import { UserEntity } from "src/user/entity/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "billings" })
export class BillingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "acc_id" })
  accountId: string;

  @Column({ name: "qb_inv_id" })
  qbInvoiceId: string;

  @Column({ name: "amount_due" })
  amountDue: number;

  @Column({ name: "balance" })
  balance: number;

  @Column({ name: "amount_payed" })
  amountPayd: number;

  @Column({ name: "due_date" })
  dueDate: string;
}
