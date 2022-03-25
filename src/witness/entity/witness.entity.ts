import { SessionEntity } from "src/session/entity/session.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

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

  @Column()
  state: number;

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
}
