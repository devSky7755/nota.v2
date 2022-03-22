import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { AccountEntity } from "src/account/entity/account.entity";
import { BillingItemEntity } from "./billing.item.entity";
import { BillingPaymentEntity } from "./billing.payment.entity";

@Entity({ name: "billings" })
export class BillingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "qb_inv_id" })
  qbInvoiceId: string;

  @Column({ name: "amount_due" })
  amountDue: number;

  @Column({ name: "balance" })
  balance: number;

  @Column({ name: "amount_payed" })
  amountPayed: number;

  @Column({ name: "due_date" })
  dueDate: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(() => AccountEntity, (account) => account.billings)
  @JoinColumn({name: 'account_id'})
  account: AccountEntity

  @OneToMany(() => BillingItemEntity, (item) => item.billing)
  items: BillingItemEntity

  @OneToMany(() => BillingPaymentEntity, (payment) => payment.billing)
  payments: BillingPaymentEntity
}
