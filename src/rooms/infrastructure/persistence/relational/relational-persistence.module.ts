import { Module } from '@nestjs/common';
import { roomsRepository } from '../rooms.repository';
import { roomsRelationalRepository } from './repositories/rooms.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roomsEntity } from './entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([roomsEntity])],
  providers: [
    {
      provide: roomsRepository,
      useClass: roomsRelationalRepository,
    },
  ],
  exports: [roomsRepository],
})
export class RelationalroomsPersistenceModule {}
