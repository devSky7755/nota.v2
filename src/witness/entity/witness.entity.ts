import { SessionEntity } from "src/session/entity/session.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "witnesses" })
export class WitnessEntity {
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

  @ManyToOne(() => StateEntity, (state) => state.s_witnesses)
  @JoinColumn({ name: 'state_id' })
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

  @ManyToMany(() => SessionEntity, (session) => session.witnesses)
  sessions: SessionEntity[];

  @ManyToOne(() => TimezoneEntity, (tz) => tz.witnesses)
  @JoinColumn({ name: "timezone" })
  timezone: TimezoneEntity;
}
