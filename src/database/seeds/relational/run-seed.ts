import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { DoctorSeedService } from './doctors/doctors-seed.service';
import { RoomSeedService } from './rooms/room-seed.service';
import { EncounterSeedService } from './encounters/encounters-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(DoctorSeedService).run();
  await app.get(RoomSeedService).run();
  await app.get(EncounterSeedService).run();

  await app.close();
};

void runSeed();
