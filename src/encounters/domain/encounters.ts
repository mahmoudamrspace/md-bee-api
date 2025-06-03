import { ApiProperty } from '@nestjs/swagger';

export class encounters {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: ['Ready', 'Recording', 'In Progress', 'Not Started'] })
  status: string;

  @ApiProperty({ description: 'Notes status like 1/2, 0/2, etc.' })
  notesStatus: string;

  @ApiProperty({ type: () => [Object] })
  doctors: any[];

  @ApiProperty({ type: () => Object })
  room: any;
}
