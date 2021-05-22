import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @ApiOkResponse({
    type: [Driver],
  })
  @Get()
  findAll(): Driver[] {
    return this.driversService.findAll();
  }

  @ApiOkResponse({
    type: Driver,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Driver {
    return this.driversService.findOne(id);
  }
}
