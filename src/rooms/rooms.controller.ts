import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { roomsService } from './rooms.service';
import { CreateroomsDto } from './dto/create-rooms.dto';
import { UpdateroomsDto } from './dto/update-rooms.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { rooms } from './domain/rooms';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllroomsDto } from './dto/find-all-rooms.dto';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rooms',
  version: '1',
})
export class roomsController {
  constructor(private readonly roomsService: roomsService) {}

  @Post()
  @ApiCreatedResponse({
    type: rooms,
  })
  create(@Body() createroomsDto: CreateroomsDto) {
    return this.roomsService.create(createroomsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(rooms),
  })
  async findAll(
    @Query() query: FindAllroomsDto,
  ): Promise<InfinityPaginationResponseDto<rooms>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.roomsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: rooms,
  })
  findById(@Param('id') id: string) {
    return this.roomsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: rooms,
  })
  update(@Param('id') id: string, @Body() updateroomsDto: UpdateroomsDto) {
    return this.roomsService.update(id, updateroomsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
