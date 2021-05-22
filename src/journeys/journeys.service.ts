import { Injectable } from '@nestjs/common';
import { getRandomEle } from '@src/common/helpers/array';
import { driverMocks } from '@src/drivers/mocks/driver.mock';
import { routeEdgeMocks } from '@src/routes/mocks/route.mock';

import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey } from './entities/journey.entity';
import { JourneysRepository } from './journeys.repository';

@Injectable()
export class JourneysService {
  constructor(private readonly journeysRepository: JourneysRepository) {}

  create(createJourneyDto: CreateJourneyDto): Journey {
    const driver = getRandomEle(driverMocks);
    const departRouteEdge = getRandomEle(routeEdgeMocks);
    const arriveRouteEdge = getRandomEle(departRouteEdge.availables);

    return this.journeysRepository.create(
      new Journey({
        ...createJourneyDto,
        driver,
        driverId: driver.id,
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
}
