import { Test, TestingModule } from '@nestjs/testing';

import { JourneysController } from './journeys.controller';
import { JourneysRepository } from './journeys.repository';
import { JourneysService } from './journeys.service';

describe('JourneysController', () => {
  let controller: JourneysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
      providers: [JourneysService, JourneysRepository],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
