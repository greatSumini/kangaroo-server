import { Test, TestingModule } from '@nestjs/testing';

import { JourneysModule } from '@src/journeys/journeys.module';
import { JourneysRepository } from '@src/journeys/journeys.repository';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JourneysModule],
      providers: [UsersService, UsersRepository, JourneysRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
