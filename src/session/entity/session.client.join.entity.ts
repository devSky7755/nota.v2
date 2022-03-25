import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { ClientEntity } from "src/client/entity/client.entity";
import { SessionEntity } from "./session.entity";

@Entity({ name: "session_client_join" })
export class SessionClientJoinEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "kba_tries" })
    kbaTries: string;

    @ManyToOne(() => SessionEntity, session => session.sessionClientJoins, { primary: true })
    @JoinColumn({ name: "session_id" })
    session: SessionEntity

    @ManyToOne(() => ClientEntity, session => session.clientSessionJoins, { primary: true })
    @JoinColumn({ name: "client_id" })
    client: ClientEntity

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}