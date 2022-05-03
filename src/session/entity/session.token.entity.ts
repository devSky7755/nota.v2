import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { SessionEntity } from "./session.entity";

export enum MSGTYPE {
    EMAIL = "EMAIL",
    SMS = "SMS",
}

@Entity({ name: "session_tokens" })
export class SessionTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "pin" })
    pin: string;

    @Column({ name: "token", nullable: true })
    token: string

    @Column({ name: "timeout_at", nullable: true })
    timeoutAt: string

    @Column({ name: "client_id", nullable: true })
    clientId: number;

    @Column({ name: "associate_id", nullable: true })
    associateId: number;

    @Column({ name: "witness_id", nullable: true })
    witnessId: number;

    @Column({
        type: "enum",
        enum: MSGTYPE,
        array: false,
        default: MSGTYPE.SMS
    })
    msgType: MSGTYPE;

    @Column({ name: "delivery_message_sid", nullable: true })
    deliveryMessageSid: string;

    @Column({ name: "delivery_status", nullable: true })
    deliveryStatus: string;

    @Column({ name: "is_delivered", default: false })
    isDelivered: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(() => SessionEntity, (session) => session.tokens)
    @JoinColumn({ name: 'session_id' })
    session: SessionEntity;
}