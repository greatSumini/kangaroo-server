import { Test, TestingModule } from '@nestjs/testing';

import { JourneysModule } from '@src/journeys/journeys.module';
import { JourneysRepository } from '@src/journeys/journeys.repository';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JourneysModule],
      controllers: [UsersController],
      providers: [UsersService, UsersRepository, JourneysRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
