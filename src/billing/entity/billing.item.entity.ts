import { BillingEntity } from "./billing.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";

@Entity({ name: "billing_items" })
export class BillingItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "qty" })
    qty: number;

    @Column({ name: "amount" })
    amount: number;

    @Column({ nullable: true, name: "discount" })
    discount: number;

    @Column({ default: true, name: "taxable" })
    taxable: boolean;

    @Column({ name: "qb_id", nullable: true })
    qbId: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(() => BillingEntity, (billing) => billing.items, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
    @JoinColumn({ name: "billing_id" })
    billing: BillingEntity
}
