import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { rooms } from '../../domain/rooms';

export abstract class roomsRepository {
  abstract create(
    data: Omit<rooms, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<rooms>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<rooms[]>;

  abstract findById(id: rooms['id']): Promise<NullableType<rooms>>;

  abstract findByIds(ids: rooms['id'][]): Promise<rooms[]>;

  abstract update(
    id: rooms['id'],
    payload: DeepPartial<rooms>,
  ): Promise<rooms | null>;

  abstract remove(id: rooms['id']): Promise<void>;
}
