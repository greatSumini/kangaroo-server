import { Injectable, NotFoundException } from '@nestjs/common';
import * as faker from 'faker';

import { getRandomIntBetween } from '@src/common/helpers/number';
import { JourneyStatus } from '@src/journeys/interfaces/journey.interface';
import { JourneysService } from '@src/journeys/journeys.service';

import { CreateKidDto } from './dto/create-kid.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Kid } from './entities/kid.entity';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly journeysService: JourneysService
  ) {}

  create(createUserDto: CreateUserDto): User {
    const kids = [...Array(getRandomIntBetween(1, 2))].map(() => Kid.mock());

    const user = this.usersRepository.create(
      new User({
        ...createUserDto,
        kids,
      })
    );

    [...Array(getRandomIntBetween(7, 10))].forEach(() => {
      const kidsCount = getRandomIntBetween(1, kids.length);
      const kidIds = kids
        .sort(() => Math.random() - 0.5)
        .map((kid) => kid.id)
        .filter((_, index) => index < kidsCount);

      this.journeysService.create({
        userId: user.id,
        kidIds,
        status: JourneyStatus.Completed,
        arriveAt: faker.date.between('2021-03-01', '2021-05-21'),
      });
    });

    return user;
  }

  findAll(): User[] {
    return this.usersRepository.find();
  }

  findOne(id: string): User {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }

  addKid(id: string, createKidDto: CreateKidDto): Kid[] {
    const user = this.usersRepository.findOne(id);

    return this.usersRepository.update(id, {
      kids: user.kids.concat(new Kid(createKidDto)),
    }).kids;
  }

  updateKid(id: string, kidId: string, updateKidDto: UpdateKidDto): Kid {
    const user = this.usersRepository.findOne(id);
    const kidIndex = user.kids.findIndex(({ id: _id }) => _id === kidId);
    if (kidIndex < 0) {
      throw new NotFoundException('해당 Kid를 찾을 수 없습니다.');
    }

    const updatedKid = {
      ...user.kids[kidIndex],
      ...updateKidDto,
    };

    this.usersRepository.update(id, {
      kids: [
        ...user.kids.slice(0, kidIndex),
        updatedKid,
        ...user.kids.slice(kidIndex + 1),
      ],
    });
    return updatedKid;
  }

  removeKid(id: string, kidId: string): Kid[] {
    const user = this.usersRepository.findOne(id);
    const kidIndex = user.kids.findIndex(({ id: _id }) => _id === kidId);
    if (kidIndex < 0) {
      throw new NotFoundException('해당 Kid를 찾을 수 없습니다.');
    }

    return this.usersRepository.update(id, {
      kids: [...user.kids.slice(0, kidIndex), ...user.kids.slice(kidIndex + 1)],
    }).kids;
  }
}
