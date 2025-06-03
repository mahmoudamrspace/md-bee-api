import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomSeedService } from './room-seed.service';
import { roomsEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([roomsEntity])],
  providers: [RoomSeedService],
  exports: [RoomSeedService],
})
export class RoomSeedModule {}
