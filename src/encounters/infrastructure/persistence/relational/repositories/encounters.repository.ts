import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { encountersEntity } from '../entities/encounters.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { encounters } from '../../../../domain/encounters';
import { encountersRepository } from '../../encounters.repository';
import { encountersMapper } from '../mappers/encounters.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class encountersRelationalRepository implements encountersRepository {
  constructor(
    @InjectRepository(encountersEntity)
    private readonly encountersRepository: Repository<encountersEntity>,
  ) {}

  async create(data: encounters): Promise<encounters> {
    const persistenceModel = encountersMapper.toPersistence(data);
    const newEntity = await this.encountersRepository.save(
      this.encountersRepository.create(persistenceModel),
    );
    return encountersMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<encounters[]> {
    const entities = await this.encountersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['doctors', 'rooms'],
    });

    return entities.map((entity) => encountersMapper.toDomain(entity));
  }

  async findById(id: encounters['id']): Promise<NullableType<encounters>> {
    const entity = await this.encountersRepository.findOne({
      where: { id },
    });

    return entity ? encountersMapper.toDomain(entity) : null;
  }

  async findByIds(ids: encounters['id'][]): Promise<encounters[]> {
    const entities = await this.encountersRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => encountersMapper.toDomain(entity));
  }

  async update(
    id: encounters['id'],
    payload: Partial<encounters>,
  ): Promise<encounters> {
    const entity = await this.encountersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.encountersRepository.save(
      this.encountersRepository.create(
        encountersMapper.toPersistence({
          ...encountersMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return encountersMapper.toDomain(updatedEntity);
  }

  async remove(id: encounters['id']): Promise<void> {
    await this.encountersRepository.delete(id);
  }
}
