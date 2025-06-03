import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatedoctorsDto } from './dto/create-doctors.dto';
import { UpdatedoctorsDto } from './dto/update-doctors.dto';
import { doctorsRepository } from './infrastructure/persistence/doctors.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { doctors } from './domain/doctors';

@Injectable()
export class doctorsService {
  constructor(
    // Dependencies here
    private readonly doctorsRepository: doctorsRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createdoctorsDto: CreatedoctorsDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.doctorsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.doctorsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: doctors['id']) {
    return this.doctorsRepository.findById(id);
  }

  findByIds(ids: doctors['id'][]) {
    return this.doctorsRepository.findByIds(ids);
  }

  async update(
    id: doctors['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatedoctorsDto: UpdatedoctorsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.doctorsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: doctors['id']) {
    return this.doctorsRepository.remove(id);
  }
}
