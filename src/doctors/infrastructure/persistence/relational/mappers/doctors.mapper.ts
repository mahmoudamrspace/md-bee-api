import { doctors } from '../../../../domain/doctors';
import { doctorsEntity } from '../entities/doctors.entity';

export class doctorsMapper {
  static toDomain(raw: doctorsEntity): doctors {
    const domainEntity = new doctors();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: doctors): doctorsEntity {
    const persistenceEntity = new doctorsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
