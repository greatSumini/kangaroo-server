import { Injectable, NotFoundException } from '@nestjs/common';

import { getRandomIntBetween } from '@src/common/helpers/number';
import { Journey } from '@src/journeys/entities/journey.entity';

import { CreateKidDto } from './dto/create-kid.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Kid } from './entities/kid.entity';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): User {
    const kids = [...Array(getRandomIntBetween(1, 2))].map(() => Kid.mock());

    const user = this.usersRepository.create(
      new User({
        ...createUserDto,
        kids,
      })
    );

    const journeys = [...Array(getRandomIntBetween(2, 5))].map(() => {
      const kidsCount = getRandomIntBetween(1, kids.length);
      const kidIds = kids
        .sort(() => Math.random() - 0.5)
        .map((kid) => kid.id)
        .filter((_, index) => index < kidsCount);

      return Journey.mock(user.id, kidIds);
    });

    user.journeys = journeys.sort(
      (a, b) => new Date(a.arriveAt).getTime() - new Date(b.arriveAt).getTime()
    );
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
