import { Controller, Get, Param } from '@nestjs/common';

import { RoutesService } from './routes.service';

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
