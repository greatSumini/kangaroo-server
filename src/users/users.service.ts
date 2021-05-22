import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.usersRepository.create(new User(createUserDto));
  }

  findAll(): User[] {
    return this.usersRepository.find();
  }

  findOne(id: string): User {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }

  addKid(id: string, createKidDto: CreateKidDto): User {
    const user = this.usersRepository.findOne(id);

    return this.usersRepository.update(id, {
      kids: user.kids.concat(new Kid(createKidDto)),
    });
  }

  updateKid(id: string, kidId: string, updateKidDto: UpdateKidDto): User {
    const user = this.usersRepository.findOne(id);
    const kidIndex = user.kids.findIndex(({ id: _id }) => _id === kidId);
    if (kidIndex < 0) {
      throw new NotFoundException('해당 Kid를 찾을 수 없습니다.');
    }

    return this.usersRepository.update(id, {
      kids: [
        ...user.kids.slice(0, kidIndex),
        {
          ...user.kids[kidIndex],
          ...updateKidDto,
        },
        ...user.kids.slice(kidIndex + 1),
      ],
    });
  }

  removeKid(id: string, kidId: string): User {
    const user = this.usersRepository.findOne(id);
    const kidIndex = user.kids.findIndex(({ id: _id }) => _id === kidId);
    if (kidIndex < 0) {
      throw new NotFoundException('해당 Kid를 찾을 수 없습니다.');
    }

    return this.usersRepository.update(id, {
      kids: [...user.kids.slice(0, kidIndex), ...user.kids.slice(kidIndex + 1)],
    });
  }
}
