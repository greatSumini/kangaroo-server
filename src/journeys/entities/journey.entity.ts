import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import * as faker from 'faker';

import { BaseIdEntity } from '@src/common/base.entity';
import { getRandomEle } from '@src/common/helpers/array';
import { routeEdgeMocks } from '@src/routes/mocks/route.mock';
import { driverMocks } from '@src/drivers/mocks/driver.mock';
import { RouteEdge } from '@src/routes/entities/route-edge.entity';

import { JourneyStatus } from '../interfaces/journey.interface';

export class Journey extends BaseIdEntity {
  @ApiProperty({
    enumName: 'JourneyStatus',
    enum: Object.values(JourneyStatus),
    default: JourneyStatus.Driving,
    required: false,
  })
  @IsEnum(JourneyStatus)
  @IsOptional()
  status: JourneyStatus;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID(4, {
    each: true,
  })
  kidIds: string[];

  @ApiProperty()
  @IsUUID()
  driverId: string;

  @ApiProperty({
    required: false,
    default: new Date(),
  })
  @IsDate()
  @IsOptional()
  departAt?: Date;

  @ApiProperty()
  @IsDate()
  arriveAt: Date;

  @ApiProperty({
    type: RouteEdge,
  })
  departRouteEdge: RouteEdge;

  @ApiProperty({
    type: RouteEdge,
  })
  arriveRouteEdge: RouteEdge;

  constructor(attributes?: Partial<Journey>) {
    super(attributes);
    if (!attributes) {
      return;
    }
    this.status = attributes.status || JourneyStatus.Driving;
    this.departAt = attributes.departAt || new Date();
    this.arriveAt = attributes.arriveAt;

    this.departRouteEdge = attributes.departRouteEdge;
    this.arriveRouteEdge = attributes.arriveRouteEdge;

    this.userId = attributes.userId;
    this.driverId = attributes.driverId;
  }

  static mock(userId: string, kidIds: string[]): Journey {
    const departAt = faker.date.between('2021-05-01', '2021-05-22');
    const arriveAt = new Date(departAt.getTime() + 15 * 60 * 1000);
    const driverId = getRandomEle(driverMocks).id;

    return new Journey({
      status: JourneyStatus.Completed,
      departAt,
      arriveAt,
      userId,
      kidIds,
      driverId,
      departRouteEdge: getRandomEle(routeEdgeMocks),
      arriveRouteEdge: getRandomEle(routeEdgeMocks),
    });
  }
}
