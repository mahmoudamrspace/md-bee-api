import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncounterSeedService } from './encounters-seed.service';
import { encountersEntity } from '../../../../encounters/infrastructure/persistence/relational/entities/encounters.entity';
import { doctorsEntity } from '../../../../doctors/infrastructure/persistence/relational/entities/doctors.entity';
import { roomsEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/rooms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([encountersEntity, doctorsEntity, roomsEntity]),
  ],
  providers: [EncounterSeedService],
  exports: [EncounterSeedService],
})
export class EncounterSeedModule {}
