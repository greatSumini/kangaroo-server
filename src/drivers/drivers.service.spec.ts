import { Test, TestingModule } from '@nestjs/testing';

import { JourneysModule } from '@src/journeys/journeys.module';
import { JourneysRepository } from '@src/journeys/journeys.repository';

import { DriversRepository } from './drivers.repository';
import { DriversService } from './drivers.service';

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JourneysModule],
      providers: [DriversService, DriversRepository, JourneysRepository],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
