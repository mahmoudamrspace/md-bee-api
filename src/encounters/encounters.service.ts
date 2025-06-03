import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateencountersDto } from './dto/create-encounters.dto';
import { UpdateencountersDto } from './dto/update-encounters.dto';
import { encountersRepository } from './infrastructure/persistence/encounters.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { encounters } from './domain/encounters';

@Injectable()
export class encountersService {
  constructor(
    // Dependencies ikk
    private readonly encountersRepository: encountersRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createencountersDto: CreateencountersDto,
  ) {
    return this.encountersRepository.create({
      status: '',
      notesStatus: '',
      doctors: [],
      room: undefined,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.encountersRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: encounters['id']) {
    return this.encountersRepository.findById(id);
  }

  findByIds(ids: encounters['id'][]) {
    return this.encountersRepository.findByIds(ids);
  }

  async update(
    id: encounters['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateencountersDto: UpdateencountersDto,
  ) {
    return this.encountersRepository.update(id, {});
  }

  remove(id: encounters['id']) {
    return this.encountersRepository.remove(id);
  }
}
