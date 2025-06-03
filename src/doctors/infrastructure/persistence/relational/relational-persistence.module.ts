import { Module } from '@nestjs/common';
import { doctorsRepository } from '../doctors.repository';
import { doctorsRelationalRepository } from './repositories/doctors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { doctorsEntity } from './entities/doctors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([doctorsEntity])],
  providers: [
    {
      provide: doctorsRepository,
      useClass: doctorsRelationalRepository,
    },
  ],
  exports: [doctorsRepository],
})
export class RelationaldoctorsPersistenceModule {}
