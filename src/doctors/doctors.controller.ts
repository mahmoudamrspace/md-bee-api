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
import { doctorsService } from './doctors.service';
import { CreatedoctorsDto } from './dto/create-doctors.dto';
import { UpdatedoctorsDto } from './dto/update-doctors.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { doctors } from './domain/doctors';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAlldoctorsDto } from './dto/find-all-doctors.dto';

@ApiTags('Doctors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'doctors',
  version: '1',
})
export class doctorsController {
  constructor(private readonly doctorsService: doctorsService) {}

  @Post()
  @ApiCreatedResponse({
    type: doctors,
  })
  create(@Body() createdoctorsDto: CreatedoctorsDto) {
    return this.doctorsService.create(createdoctorsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(doctors),
  })
  async findAll(
    @Query() query: FindAlldoctorsDto,
  ): Promise<InfinityPaginationResponseDto<doctors>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.doctorsService.findAllWithPagination({
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
    type: doctors,
  })
  findById(@Param('id') id: string) {
    return this.doctorsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: doctors,
  })
  update(@Param('id') id: string, @Body() updatedoctorsDto: UpdatedoctorsDto) {
    return this.doctorsService.update(id, updatedoctorsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
