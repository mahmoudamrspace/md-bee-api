import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { roomsService } from './rooms.service';
import { roomsController } from './rooms.controller';
import { RelationalroomsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalroomsPersistenceModule,
  ],
  controllers: [roomsController],
  providers: [roomsService],
  exports: [roomsService, RelationalroomsPersistenceModule],
})
export class roomsModule {}
