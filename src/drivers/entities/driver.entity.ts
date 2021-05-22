import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';
import { Journey } from '@src/journeys/entities/journey.entity';
import { Car } from './car.entity';
import { FmsReport } from './fms-report.entity';

export class Driver extends BaseIdEntity {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsUrl()
  avatarUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mbti?: string;

  @ApiProperty({
    type: Car,
  })
  car: Car;

  @ApiProperty({
    type: FmsReport,
  })
  fmsReport: FmsReport;

  @ApiProperty({
    type: [Journey],
    required: false,
    default: [],
  })
  @IsOptional()
  journeys?: Journey[];

  constructor(attributes?: Partial<Driver>) {
    super(attributes);
    if (!attributes) {
      return;
    }

    this.name = attributes.name;
    this.age = attributes.age;
    this.avatarUrl = attributes.avatarUrl;
    this.mbti = attributes.mbti;

    this.car = attributes.car;
    this.fmsReport = attributes.fmsReport;
    this.journeys = attributes.journeys || [];
  }
}
