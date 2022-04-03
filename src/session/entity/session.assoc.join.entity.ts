import { AssociateEntity } from "src/associate/entity/associate.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { SessionEntity } from "./session.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";


@Entity({ name: "session_associate_join" })
export class SessionAssociateJoinEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "is_user", default: false })
    isUser: boolean;

    @ManyToOne(() => SessionEntity, session => session.sessionAssociateJoins, { primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "session_id" })
    session: SessionEntity

    @ManyToOne(() => AssociateEntity, session => session.associateSessionJoins, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "associate_id" })
    associate: AssociateEntity

    @ManyToOne(() => UserEntity, user => user.userAssocSessionJoins, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}
