import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import * as faker from 'faker';

import { getRandomEle } from '@src/common/helpers/array';
import { BaseIdEntity } from '@src/common/base.entity';
import { RouteEdge } from '@src/routes/entities/route-edge.entity';
import { routeEdgeMocks } from '@src/routes/mocks/route.mock';
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

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;

  @ApiProperty({
    type: RouteEdge,
    description: '현재 향하고 있는 목적지',
  })
  @IsNumber()
  destRouteEdge: RouteEdge;

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

    this.lat = attributes.lat;
    this.lng = attributes.lng;

    this.car = attributes.car;
    this.fmsReport = attributes.fmsReport;
    this.journeys = attributes.journeys || [];
  }

  static mock(): Driver {
    const nowEdge = getRandomEle(routeEdgeMocks);

    return new Driver({
      name: faker.name.findName(),
      /** 30 ~ 50 */
      age: Math.floor(Math.random() * 20) + 30,
      avatarUrl: faker.image.imageUrl(),
      lat: nowEdge.lat + (Math.random() - 0.5) * 0.006,
      lng: nowEdge.lng + (Math.random() - 0.5) * 0.006,
      destRouteEdge: getRandomEle(nowEdge.availables),
      car: Car.mock(),
      fmsReport: FmsReport.mock(),
    });
  }
}
