import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { doctorsEntity } from '../entities/doctors.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { doctors } from '../../../../domain/doctors';
import { doctorsRepository } from '../../doctors.repository';
import { doctorsMapper } from '../mappers/doctors.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class doctorsRelationalRepository implements doctorsRepository {
  constructor(
    @InjectRepository(doctorsEntity)
    private readonly doctorsRepository: Repository<doctorsEntity>,
  ) {}

  async create(data: doctors): Promise<doctors> {
    const persistenceModel = doctorsMapper.toPersistence(data);
    const newEntity = await this.doctorsRepository.save(
      this.doctorsRepository.create(persistenceModel),
    );
    return doctorsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<doctors[]> {
    const entities = await this.doctorsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => doctorsMapper.toDomain(entity));
  }

  async findById(id: doctors['id']): Promise<NullableType<doctors>> {
    const entity = await this.doctorsRepository.findOne({
      where: { id },
    });

    return entity ? doctorsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: doctors['id'][]): Promise<doctors[]> {
    const entities = await this.doctorsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => doctorsMapper.toDomain(entity));
  }

  async update(id: doctors['id'], payload: Partial<doctors>): Promise<doctors> {
    const entity = await this.doctorsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.doctorsRepository.save(
      this.doctorsRepository.create(
        doctorsMapper.toPersistence({
          ...doctorsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return doctorsMapper.toDomain(updatedEntity);
  }

  async remove(id: doctors['id']): Promise<void> {
    await this.doctorsRepository.delete(id);
  }
}
