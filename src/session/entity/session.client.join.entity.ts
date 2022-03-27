import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from "typeorm";

import { IsNotEmpty } from "class-validator";

@Entity({ name: "session_client_join" })
export class SessionClientJoinEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "kba_tries" })
    kbaTries: string;

    @Column()
    @IsNotEmpty()
    @PrimaryColumn()
    sessionId: number

    @Column()
    @IsNotEmpty()
    @PrimaryColumn()
    clientId: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}