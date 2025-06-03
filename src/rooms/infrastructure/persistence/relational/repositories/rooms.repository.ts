import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { roomsEntity } from '../entities/rooms.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { rooms } from '../../../../domain/rooms';
import { roomsRepository } from '../../rooms.repository';
import { roomsMapper } from '../mappers/rooms.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class roomsRelationalRepository implements roomsRepository {
  constructor(
    @InjectRepository(roomsEntity)
    private readonly roomsRepository: Repository<roomsEntity>,
  ) {}

  async create(data: rooms): Promise<rooms> {
    const persistenceModel = roomsMapper.toPersistence(data);
    const newEntity = await this.roomsRepository.save(
      this.roomsRepository.create(persistenceModel),
    );
    return roomsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<rooms[]> {
    const entities = await this.roomsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => roomsMapper.toDomain(entity));
  }

  async findById(id: rooms['id']): Promise<NullableType<rooms>> {
    const entity = await this.roomsRepository.findOne({
      where: { id },
    });

    return entity ? roomsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: rooms['id'][]): Promise<rooms[]> {
    const entities = await this.roomsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => roomsMapper.toDomain(entity));
  }

  async update(id: rooms['id'], payload: Partial<rooms>): Promise<rooms> {
    const entity = await this.roomsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.roomsRepository.save(
      this.roomsRepository.create(
        roomsMapper.toPersistence({
          ...roomsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return roomsMapper.toDomain(updatedEntity);
  }

  async remove(id: rooms['id']): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}
