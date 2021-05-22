import { Injectable } from '@nestjs/common';
import { RoutesService } from '@src/routes/routes.service';

import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey } from './entities/journey.entity';
import { JourneysRepository } from './journeys.repository';

@Injectable()
export class JourneysService {
  constructor(
    private readonly journeysRepository: JourneysRepository,
    private readonly routesService: RoutesService
  ) {}

  create(createJourneyDto: CreateJourneyDto): Journey {
    const { departRouteEdgeId, arriveRouteEdgeId } = createJourneyDto;
    const departRouteEdge = this.routesService.findOneEdge(departRouteEdgeId);
    const arriveRouteEdge = this.routesService.findOneEdge(arriveRouteEdgeId);

    return this.journeysRepository.create(
      new Journey({ ...createJourneyDto, departRouteEdge, arriveRouteEdge })
    );
  }

  findAll(): Journey[] {
    return this.journeysRepository.find();
  }

  findOne(id: string): Journey {
    return this.journeysRepository.findOne(id);
  }

  update(id: string, updateJourneyDto: UpdateJourneyDto) {
    const { departRouteEdgeId, arriveRouteEdgeId } = updateJourneyDto;

    if (departRouteEdgeId) {
      updateJourneyDto['departRouteEdge'] =
        this.routesService.findOneEdge(departRouteEdgeId);
    }
    if (arriveRouteEdgeId) {
      updateJourneyDto['arriveRouteEdge'] =
        this.routesService.findOneEdge(arriveRouteEdgeId);
    }

    return this.journeysRepository.update(id, updateJourneyDto);
  }

  remove(id: string) {
    return this.journeysRepository.remove(id);
  }
}
