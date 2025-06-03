import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { doctorsEntity } from '../../../../doctors/infrastructure/persistence/relational/entities/doctors.entity';

@Injectable()
export class DoctorSeedService {
  constructor(
    @InjectRepository(doctorsEntity)
    private repository: Repository<doctorsEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (!count) {
      const doctors = this.repository.create([
        { name: 'Dr. Alice' },
        { name: 'Dr. Bob' },
        { name: 'Dr. Charlie' },
      ]);
      await this.repository.save(doctors);
    }
  }
}
