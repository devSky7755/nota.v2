import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { SessionEntity } from "./session.entity";
import { SessionStatusEntity } from "./session.status.entity";
export enum MSGTYPE {
    EMAIL = "EMAIL",
    SMS = "SMS",
}

@Entity({ name: "session_status_notify" })
export class SessionStatusNotifiyEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => SessionStatusEntity, (sessionStatus) => sessionStatus.notifiedMsgs)
    @JoinColumn({ name: 'session_status_id' })
    sessionStatus: SessionEntity;
}