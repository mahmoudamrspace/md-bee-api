import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { encounters } from '../../domain/encounters';

export abstract class encountersRepository {
  abstract create(
    data: Omit<encounters, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<encounters>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<encounters[]>;

  abstract findById(id: encounters['id']): Promise<NullableType<encounters>>;

  abstract findByIds(ids: encounters['id'][]): Promise<encounters[]>;

  abstract update(
    id: encounters['id'],
    payload: DeepPartial<encounters>,
  ): Promise<encounters | null>;

  abstract remove(id: encounters['id']): Promise<void>;
}
