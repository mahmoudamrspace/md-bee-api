import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { doctors } from '../../domain/doctors';

export abstract class doctorsRepository {
  abstract create(
    data: Omit<doctors, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<doctors>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<doctors[]>;

  abstract findById(id: doctors['id']): Promise<NullableType<doctors>>;

  abstract findByIds(ids: doctors['id'][]): Promise<doctors[]>;

  abstract update(
    id: doctors['id'],
    payload: DeepPartial<doctors>,
  ): Promise<doctors | null>;

  abstract remove(id: doctors['id']): Promise<void>;
}
