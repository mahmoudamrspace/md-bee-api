import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { EncountersStatusDto } from '../../../../dto/encounter.dto';
import { roomsEntity } from '../../../../../rooms/infrastructure/persistence/relational/entities/rooms.entity';
import { doctorsEntity } from '../../../../../doctors/infrastructure/persistence/relational/entities/doctors.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'encounters',
})
export class encountersEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EncountersStatusDto,
    default: EncountersStatusDto.NotStarted,
  })
  status: string;

  @Column({
    type: String,
  })
  notesStatus: string;

  @Column({
    type: String,
  })
  location: string;

  @Column({
    type: 'date',
  })
  encounterDate: Date;

  @ManyToOne(() => roomsEntity, {
    eager: true,
  })
  rooms?: roomsEntity;

  @ManyToMany(() => doctorsEntity, (doctor) => doctor.encounters, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  doctors?: doctorsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.encounters)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
