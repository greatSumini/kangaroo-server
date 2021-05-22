import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoutesService } from './routes.service';

@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  findAllEdges() {
    return this.routesService.findAllEdges();
  }

  @Get(':id')
  findOneEdge(@Param('id') id: string) {
    return this.routesService.findOneEdge(id);
  }
}
