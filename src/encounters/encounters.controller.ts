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
import { encountersService } from './encounters.service';
import { CreateencountersDto } from './dto/create-encounters.dto';
import { UpdateencountersDto } from './dto/update-encounters.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { encounters } from './domain/encounters';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllencountersDto } from './dto/find-all-encounters.dto';

@ApiTags('Encounters')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'encounters',
  version: '1',
})
export class encountersController {
  constructor(private readonly encountersService: encountersService) {}

  @Post()
  @ApiCreatedResponse({
    type: encounters,
  })
  create(@Body() createencountersDto: CreateencountersDto) {
    return this.encountersService.create(createencountersDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(encounters),
  })
  async findAll(
    @Query() query: FindAllencountersDto,
  ): Promise<InfinityPaginationResponseDto<encounters>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.encountersService.findAllWithPagination({
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
    type: encounters,
  })
  findById(@Param('id') id: string) {
    return this.encountersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: encounters,
  })
  update(
    @Param('id') id: string,
    @Body() updateencountersDto: UpdateencountersDto,
  ) {
    return this.encountersService.update(id, updateencountersDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.encountersService.remove(id);
  }
}
