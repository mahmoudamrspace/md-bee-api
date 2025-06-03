import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { encountersService } from './encounters.service';
import { encountersController } from './encounters.controller';
import { RelationalencountersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalencountersPersistenceModule,
  ],
  controllers: [encountersController],
  providers: [encountersService],
  exports: [encountersService, RelationalencountersPersistenceModule],
})
export class encountersModule {}
