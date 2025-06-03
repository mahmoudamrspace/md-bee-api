import { doctorsEntity } from '../../../../../doctors/infrastructure/persistence/relational/entities/doctors.entity';
import { roomsEntity } from '../../../../../rooms/infrastructure/persistence/relational/entities/rooms.entity';
import { encounters } from '../../../../domain/encounters';
import { encountersEntity } from '../entities/encounters.entity';

export class encountersMapper {
  static toDomain(raw: encountersEntity): encounters {
    const domainEntity = new encounters();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.status = raw.status;
    domainEntity.notesStatus = raw.notesStatus;
    domainEntity.doctors = raw.doctors ?? [];
    domainEntity.room = raw.rooms ?? null;

    return domainEntity;
  }

  static toPersistence(domainEntity: encounters): encountersEntity {
    const persistenceEntity = new encountersEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    persistenceEntity.status = domainEntity.status;
    persistenceEntity.notesStatus = domainEntity.notesStatus;

    if (Array.isArray(domainEntity.doctors)) {
      persistenceEntity.doctors = domainEntity.doctors.map((id) => {
        const doctor = new doctorsEntity();
        doctor.id = id;
        return doctor;
      });
    }

    if (domainEntity.room) {
      const room = new roomsEntity();
      room.id = domainEntity.room;
      persistenceEntity.rooms = room;
    }

    return persistenceEntity;
  }
}
