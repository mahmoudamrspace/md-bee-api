// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateencountersDto } from './create-encounters.dto';

export class UpdateencountersDto extends PartialType(CreateencountersDto) {}
