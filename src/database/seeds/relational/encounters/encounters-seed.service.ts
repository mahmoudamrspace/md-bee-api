import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encountersEntity } from '../../../../encounters/infrastructure/persistence/relational/entities/encounters.entity';
import { roomsEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/rooms.entity';
import { doctorsEntity } from '../../../../doctors/infrastructure/persistence/relational/entities/doctors.entity';
import { EncountersStatusDto } from '../../../../encounters/dto/encounter.dto';

@Injectable()
export class EncounterSeedService {
  constructor(
    @InjectRepository(encountersEntity)
    private encounterRepo: Repository<encountersEntity>,

    @InjectRepository(roomsEntity)
    private roomRepo: Repository<roomsEntity>,

    @InjectRepository(doctorsEntity)
    private doctorRepo: Repository<doctorsEntity>,
  ) {}

  async run() {
    const count = await this.encounterRepo.count();
    if (count >= 20) {
      console.log('Encounters already seeded');
      return;
    }

    const rooms = await this.roomRepo.find();
    const doctors = await this.doctorRepo.find();

    if (!rooms.length || !doctors.length) {
      throw new Error('Rooms and Doctors must be seeded before encounters');
    }

    const statuses = Object.values(EncountersStatusDto);
    const notesStatuses = ['0/2', '1/2', '2/2', '0\\2', '1\\2', '2\\2'];

    const encountersToSave: encountersEntity[] = [];

    for (let i = 0; i < 25; i++) {
      const encounter = this.encounterRepo.create({
        status: statuses[i % statuses.length],
        notesStatus: notesStatuses[i % notesStatuses.length],
        location: `Room ${i + 1}`,
        encounterDate: new Date(Date.now() - i * 86_400_000),
        rooms: rooms[i % rooms.length],
        doctors: [doctors[i % doctors.length]],
      });

      encountersToSave.push(encounter);
    }

    await this.encounterRepo.save(encountersToSave);
    console.log('Encounters seeded:', encountersToSave.length);
  }
}
