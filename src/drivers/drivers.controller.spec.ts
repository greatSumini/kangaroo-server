import { Test, TestingModule } from '@nestjs/testing';
import { JourneysModule } from '@src/journeys/journeys.module';
import { JourneysRepository } from '@src/journeys/journeys.repository';
import { DriversController } from './drivers.controller';
import { DriversRepository } from './drivers.repository';
import { DriversService } from './drivers.service';

describe('DriversController', () => {
  let controller: DriversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JourneysModule],
      controllers: [DriversController],
      providers: [DriversService, DriversRepository, JourneysRepository],
    }).compile();

    controller = module.get<DriversController>(DriversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
