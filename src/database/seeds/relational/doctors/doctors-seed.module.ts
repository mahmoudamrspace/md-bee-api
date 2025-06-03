import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSeedService } from './doctors-seed.service';
import { doctorsEntity } from '../../../../doctors/infrastructure/persistence/relational/entities/doctors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([doctorsEntity])],
  providers: [DoctorSeedService],
  exports: [DoctorSeedService],
})
export class DoctorSeedModule {}
