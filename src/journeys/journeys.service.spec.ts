import { Test, TestingModule } from '@nestjs/testing';

import { JourneysRepository } from './journeys.repository';
import { JourneysService } from './journeys.service';

describe('JourneysService', () => {
  let service: JourneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourneysService, JourneysRepository],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
