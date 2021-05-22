import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';
import { JourneysRepository } from '@src/journeys/journeys.repository';

import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(private readonly journeysRepository: JourneysRepository) {
    super();
  }

  serialize = (record: User): User => {
    return {
      ...record,
      journeys: this.journeysRepository.find({ userId: record.id }),
    };
  };
}
