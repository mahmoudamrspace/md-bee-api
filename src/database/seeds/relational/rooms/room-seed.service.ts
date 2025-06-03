import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { roomsEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/rooms.entity';

@Injectable()
export class RoomSeedService {
  constructor(
    @InjectRepository(roomsEntity)
    private repository: Repository<roomsEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (!count) {
      const rooms = this.repository.create([
        { name: 'Room A' },
        { name: 'Room B' },
        { name: 'Room C' },
      ]);
      await this.repository.save(rooms);
    }
  }
}
