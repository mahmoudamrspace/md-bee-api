// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatedoctorsDto } from './create-doctors.dto';

export class UpdatedoctorsDto extends PartialType(CreatedoctorsDto) {}
