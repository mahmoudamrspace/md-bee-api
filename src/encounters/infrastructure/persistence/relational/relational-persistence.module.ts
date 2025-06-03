import { Module } from '@nestjs/common';
import { encountersRepository } from '../encounters.repository';
import { encountersRelationalRepository } from './repositories/encounters.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { encountersEntity } from './entities/encounters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([encountersEntity])],
  providers: [
    {
      provide: encountersRepository,
      useClass: encountersRelationalRepository,
    },
  ],
  exports: [encountersRepository],
})
export class RelationalencountersPersistenceModule {}
