import { SessionEntity } from "src/session/entity/session.entity";
import { SessionAssociateJoinEntity } from "src/session/entity/session.assoc.join.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

@Entity({ name: "associates" })
export class AssociateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "address_one" })
  addressOne: string;

  @Column({ name: "address_two" })
  addressTwo: string;

  @Column()
  city: string;

  @ManyToOne(() => StateEntity, (state) => state.s_associates)
  state: StateEntity

  @Column({ name: "zip_code" })
  zipCode: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @OneToMany(() => SessionAssociateJoinEntity, (saj) => saj.associate, { cascade: true })
  associateSessionJoins: SessionAssociateJoinEntity[]

  @ManyToOne(() => TimezoneEntity, (tz) => tz.associates)
  @JoinColumn({ name: "timezone" })
  timezone: TimezoneEntity;

  // @ManyToMany(() => SessionEntity, (session) => session.associates)
  // sessions: SessionEntity[];
}
