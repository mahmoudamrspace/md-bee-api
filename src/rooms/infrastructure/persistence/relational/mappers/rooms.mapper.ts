import { rooms } from '../../../../domain/rooms';
import { roomsEntity } from '../entities/rooms.entity';

export class roomsMapper {
  static toDomain(raw: roomsEntity): rooms {
    const domainEntity = new rooms();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: rooms): roomsEntity {
    const persistenceEntity = new roomsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
