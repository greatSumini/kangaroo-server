import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';

import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends BaseRepository<User> {}
