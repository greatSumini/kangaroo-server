import { Injectable } from '@nestjs/common';

import { RouteEdge } from './entities/route-edge.entity';
import { RouteEdgesRepository } from './routes.repository';

@Injectable()
export class RoutesService {
  constructor(private readonly routeEdgesRepository: RouteEdgesRepository) {}

  findAllEdges(): RouteEdge[] {
    return this.routeEdgesRepository.find();
  }

  findOneEdge(id: string): RouteEdge {
    return this.routeEdgesRepository.findOne(id);
  }
}
