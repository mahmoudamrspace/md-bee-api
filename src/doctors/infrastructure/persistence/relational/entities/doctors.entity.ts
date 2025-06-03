import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { encountersEntity } from '../../../../../encounters/infrastructure/persistence/relational/entities/encounters.entity';

@Entity({
  name: 'doctors',
})
export class doctorsEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String,
  })
  name: string;

  @ManyToMany(() => encountersEntity, (encounter) => encounter.doctors)
  encounters?: encountersEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
