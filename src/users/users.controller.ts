import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { Kid } from './entities/kid.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: User,
    description: 'The record has been successfully created.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiOkResponse({ type: [Kid] })
  @ApiNotFoundResponse()
  @Get(':id/kids')
  getKids(@Param('id') id: string): Kid[] {
    return this.usersService.findOne(id).kids;
  }

  @ApiOkResponse({ type: [Kid] })
  @ApiNotFoundResponse()
  @Post(':id/kids')
  addKid(@Param('id') id: string, @Body() createKidDto: CreateKidDto): Kid[] {
    return this.usersService.addKid(id, createKidDto);
  }

  @ApiOkResponse({ type: Kid })
  @ApiNotFoundResponse()
  @Patch(':id/kids/:kidId')
  updateKid(
    @Param('id') id: string,
    @Param('kidId') kidId: string,
    @Body() updatekidDto: UpdateKidDto
  ): Kid {
    return this.usersService.updateKid(id, kidId, updatekidDto);
  }

  @ApiOkResponse({ type: [Kid] })
  @ApiNotFoundResponse()
  @Delete(':id/kids/:kidId')
  removeKid(@Param('id') id: string, @Param('kidId') kidId: string): Kid[] {
    return this.usersService.removeKid(id, kidId);
  }
}
