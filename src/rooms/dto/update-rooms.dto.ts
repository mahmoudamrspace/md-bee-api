// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateroomsDto } from './create-rooms.dto';

export class UpdateroomsDto extends PartialType(CreateroomsDto) {}
