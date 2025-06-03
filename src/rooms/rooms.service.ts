import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateroomsDto } from './dto/create-rooms.dto';
import { UpdateroomsDto } from './dto/update-rooms.dto';
import { roomsRepository } from './infrastructure/persistence/rooms.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { rooms } from './domain/rooms';

@Injectable()
export class roomsService {
  constructor(
    // Dependencies here
    private readonly roomsRepository: roomsRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createroomsDto: CreateroomsDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.roomsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.roomsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: rooms['id']) {
    return this.roomsRepository.findById(id);
  }

  findByIds(ids: rooms['id'][]) {
    return this.roomsRepository.findByIds(ids);
  }

  async update(
    id: rooms['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateroomsDto: UpdateroomsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.roomsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: rooms['id']) {
    return this.roomsRepository.remove(id);
  }
}
