import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey } from './entities/journey.entity';

@ApiTags('Journeys')
@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @ApiCreatedResponse({
    type: Journey,
    description: 'The record has been successfully created.',
  })
  @ApiNotFoundResponse({
    description:
      '대기 중인 운전 기사님들이 없을 때입니다. 잠시 후 다시 시도해주세요!',
  })
  @Post()
  create(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeysService.create(createJourneyDto);
  }

  @ApiOkResponse({
    type: [Journey],
  })
  @Get()
  findAll() {
    return this.journeysService.findAll();
  }

  @ApiOkResponse({
    type: Journey,
  })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeysService.findOne(id);
  }

  @ApiOkResponse({
    type: Journey,
  })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJourneyDto: UpdateJourneyDto) {
    return this.journeysService.update(id, updateJourneyDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journeysService.remove(id);
  }

  @ApiOkResponse({
    type: Journey,
  })
  @ApiNotFoundResponse()
  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.journeysService.complete(id);
  }
}
