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
import { SessionStatusNotifiyEntity } from "./session.status.notify.entity";
export enum MSGTYPE {
    EMAIL = "EMAIL",
    SMS = "SMS",
}

@Entity({ name: "session_statuses" })
export class SessionStatusEntity {
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

    @OneToOne(() => SessionEntity, (session) => session.sessionStatus)
    session: SessionEntity

    @OneToMany(() => SessionStatusNotifiyEntity, (notify) => notify.sessionStatus)
    notifiedMsgs: SessionStatusNotifiyEntity
}