import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { doctorsService } from './doctors.service';
import { doctorsController } from './doctors.controller';
import { RelationaldoctorsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationaldoctorsPersistenceModule,
  ],
  controllers: [doctorsController],
  providers: [doctorsService],
  exports: [doctorsService, RelationaldoctorsPersistenceModule],
})
export class doctorsModule {}
