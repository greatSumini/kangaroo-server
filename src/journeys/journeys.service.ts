import { Injectable, NotFoundException } from '@nestjs/common';
import { getRandomEle } from '@src/common/helpers/array';
import { DriversService } from '@src/drivers/drivers.service';
import { routeEdgeMocks } from '@src/routes/mocks/route.mock';

import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey } from './entities/journey.entity';
import { JourneyStatus } from './interfaces/journey.interface';
import { JourneysRepository } from './journeys.repository';

@Injectable()
export class JourneysService {
  constructor(
    private readonly journeysRepository: JourneysRepository,
    private readonly driversService: DriversService
  ) {}

  create(createJourneyDto: CreateJourneyDto & Partial<Journey>): Journey {
    const departRouteEdge = getRandomEle(routeEdgeMocks);
    const arriveRouteEdge = getRandomEle(departRouteEdge.availables);

    const freeDrivers = this.driversService
      .findAll()
      .filter(
        ({ journeys }) =>
          !journeys?.some((journey) => journey.status === JourneyStatus.Driving)
      )
      .sort(() => Math.random() - 0.5);

    if (freeDrivers.length === 0) {
      throw new NotFoundException(
        '모든 기사님이 운행중입니다. 잠시 후 다시 시도해주세요'
      );
    }

    return this.journeysRepository.create(
      new Journey({
        ...createJourneyDto,
        driverId: freeDrivers[0].id,
        departRouteEdge,
        arriveRouteEdge,
      })
    );
  }

  findAll(): Journey[] {
    return this.journeysRepository.find();
  }

  findOne(id: string): Journey {
    return this.journeysRepository.findOne(id);
  }

  update(id: string, updateJourneyDto: UpdateJourneyDto) {
    return this.journeysRepository.update(id, updateJourneyDto);
  }

  remove(id: string) {
    return this.journeysRepository.remove(id);
  }

  complete(id: string) {
    return this.journeysRepository.update(id, {
      status: JourneyStatus.Completed,
    });
  }
}
