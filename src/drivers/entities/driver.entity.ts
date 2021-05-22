import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import * as faker from 'faker';

import { getRandomEle } from '@src/common/helpers/array';
import { BaseIdEntity } from '@src/common/base.entity';
import { RouteEdge } from '@src/routes/entities/route-edge.entity';
import { routeEdgeMocks } from '@src/routes/mocks/route.mock';
import { Journey } from '@src/journeys/entities/journey.entity';

import { DriverLocation } from '../interfaces/driver.interface';
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
  @IsNumber()
  averageSpeed: number;

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
    this.averageSpeed = attributes.averageSpeed;

    this.lat = attributes.lat;
    this.lng = attributes.lng;

    this.car = attributes.car;
    this.destRouteEdge = attributes.destRouteEdge;
    this.fmsReport = attributes.fmsReport;
    this.journeys = attributes.journeys || [];
  }

  static mock(): Driver {
    const nowEdge = getRandomEle(routeEdgeMocks);
    const destRouteEdgeId = getRandomEle(nowEdge.availables).id;
    const destRouteEdge = routeEdgeMocks.find(
      ({ id }) => id === destRouteEdgeId
    );

    return new Driver({
      name: faker.name.findName(),
      /** 30 ~ 50 */
      age: Math.floor(Math.random() * 20) + 30,
      avatarUrl: faker.image.imageUrl(),
      /** 40 ~ 42 */
      averageSpeed: Math.random() * 2 + 40,
      lat: nowEdge.lat + (Math.random() - 0.5) * 0.006,
      lng: nowEdge.lng + (Math.random() - 0.5) * 0.006,
      destRouteEdge,
      car: Car.mock(),
      fmsReport: FmsReport.mock(),
    });
  }

  /** 위도, 경도 둘 중 하나라도 초과한 경우 도착한 것으로 판단한다. */
  private isArrived? = (prev: DriverLocation): boolean => {
    const edge = this.destRouteEdge;

    if (
      Math.sign(prev.lat - edge.lat) !== Math.sign(this.lat - edge.lat) ||
      Math.sign(prev.lng - edge.lng) !== Math.sign(this.lng - edge.lng)
    ) {
      return true;
    }

    return false;
  };

  move = () => {
    const velocity = Math.random() * 2;
    const diffLat = 0.0001 * velocity;
    const diffLng = 0.00015 * velocity;

    const prev: DriverLocation = {
      lat: this.lat,
      lng: this.lng,
    };
    this.lat += diffLat;
    this.lng += diffLng;

    if (this.isArrived(prev)) {
      const destRouteEdgeId = getRandomEle(this.destRouteEdge.availables).id;
      this.destRouteEdge = routeEdgeMocks.find(
        ({ id }) => id === destRouteEdgeId
      );
    }
  };
}
