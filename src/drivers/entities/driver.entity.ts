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
import { getRandomIntBetween } from '@src/common/helpers/number';
import { driverMbtiMockData } from '../mocks/driver.mock';
import { DriverMbti } from './driver-mbti.entity';

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

  @ApiProperty({
    type: [DriverMbti],
  })
  @IsOptional()
  mbtis?: DriverMbti[];

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;

  @ApiProperty({
    type: RouteEdge,
    description: '직전까지 위치하던 지점',
  })
  @IsNumber()
  nowRouteEdge: RouteEdge;

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
    this.mbtis = attributes.mbtis;
    this.averageSpeed = attributes.averageSpeed;

    this.lat = attributes.lat;
    this.lng = attributes.lng;

    this.car = attributes.car;
    this.nowRouteEdge = attributes.nowRouteEdge;
    this.destRouteEdge = attributes.destRouteEdge;
    this.fmsReport = attributes.fmsReport;
    this.journeys = attributes.journeys || [];
  }

  static mock(): Driver {
    const nowRouteEdge = getRandomEle(routeEdgeMocks);
    const destRouteEdgeId = getRandomEle(nowRouteEdge.availables).id;
    const destRouteEdge = routeEdgeMocks.find(
      ({ id }) => id === destRouteEdgeId
    );

    const mbtisCount = getRandomIntBetween(3, 5);
    const mbtis = driverMbtiMockData
      .sort(() => Math.random() - 0.5)
      .filter((_, index) => index < mbtisCount);

    return new Driver({
      name: faker.name.findName(),
      /** 30 ~ 50 */
      age: Math.floor(Math.random() * 20) + 30,
      mbtis,
      avatarUrl: faker.image.imageUrl(),
      /** 40 ~ 42 */
      averageSpeed: Math.random() * 2 + 40,
      lat: nowRouteEdge.lat + (Math.random() - 0.5) * 0.006,
      lng: nowRouteEdge.lng + (Math.random() - 0.5) * 0.006,
      nowRouteEdge,
      destRouteEdge,
      car: Car.mock(),
      fmsReport: FmsReport.mock(),
    });
  }

  private isOverDest? = (): [boolean, boolean] => {
    const now = this.nowRouteEdge;
    const dest = this.destRouteEdge;

    return [
      Math.sign(now.lat - dest.lat) !== Math.sign(this.lat - dest.lat),
      Math.sign(now.lng - dest.lng) !== Math.sign(this.lng - dest.lng),
    ];
  };

  move = () => {
    const velocity = Math.random() * 0.3;
    const { lat, lng } = this.destRouteEdge;

    const [isLatOver, isLngOver] = this.isOverDest();

    const [latDist, lngDist] = [
      lat - this.nowRouteEdge.lat,
      lng - this.nowRouteEdge.lng,
    ];

    const diffLat = (latDist / 20) * velocity;
    const diffLng = (lngDist / 20) * velocity;

    if (!isLatOver) {
      this.lat += diffLat;
    }
    if (!isLngOver) {
      this.lng += diffLng;
    }

    if (isLatOver && isLngOver) {
      this.nowRouteEdge = this.destRouteEdge;
      const destRouteEdgeId = getRandomEle(this.destRouteEdge.availables).id;
      this.destRouteEdge = routeEdgeMocks.find(
        ({ id }) => id === destRouteEdgeId
      );
    }
  };
}
