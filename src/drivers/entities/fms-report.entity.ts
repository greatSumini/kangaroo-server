import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import * as faker from 'faker';

import { BrakeStatus } from '../interfaces/fms-report.interface';
import { getRandomEle } from '@src/common/helpers/array';

const breakStatusValues = Object.values(BrakeStatus);

export class FmsReport {
  @ApiProperty()
  @IsNumber()
  speed: number;

  @ApiProperty({ description: '브레이크 페달 위치 [0~1]' })
  @IsNumber()
  brakePedalPos: number;

  @ApiProperty({
    enumName: 'BrakeStatus',
    enum: breakStatusValues,
  })
  brakeStatus: BrakeStatus;

  @ApiProperty({
    description: '전조등 켜짐 꺼짐',
  })
  @IsBoolean()
  externalLampStatus: boolean;

  @ApiProperty({ description: '악셀 페달 위치 [0~1]' })
  @IsNumber()
  accelPedalPos: number;

  @ApiProperty({ description: '배터리 공급 전압 [110 | 220 | 380 | 440]' })
  @IsNumber()
  batterySupplyVoltage: number;

  constructor(attributes?: Partial<FmsReport>) {
    if (!attributes) {
      return;
    }

    this.speed = attributes.speed;
    this.brakePedalPos = attributes.brakePedalPos;
    this.brakeStatus = attributes.brakeStatus;
    this.externalLampStatus = attributes.externalLampStatus;
    this.accelPedalPos = attributes.accelPedalPos;
    this.batterySupplyVoltage = attributes.batterySupplyVoltage;
  }

  static mock(): FmsReport {
    return new FmsReport({
      /** 30 ~ 45 */
      speed: Math.floor(Math.random() * 15) + 30,
      /** 0 ~ 1 */
      brakePedalPos: Math.random(),
      /** 40 ~ 42 */
      brakeStatus: getRandomEle([BrakeStatus.Good, BrakeStatus.Great]),
      /** 30 ~ 45 */
      externalLampStatus: faker.datatype.boolean(),
      /** 0 ~ 1 */
      accelPedalPos: Math.random(),
      /** 0 ~ 1 */
      batterySupplyVoltage: getRandomEle([110, 220, 380, 440]),
    });
  }
}
