import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum DriverMbtiType {
  Safe = 'SAFE',
  Time = 'TIME',
  Heart = 'HEART',
  Love = 'LOVE',
  Gentle = 'GENTLE',
}

const { Safe, Time, Heart, Love, Gentle } = DriverMbtiType;

export class DriverMbti {
  @ApiProperty({
    enum: [Safe, Time, Heart, Love, Gentle],
    enumName: 'DriverMbtiType',
  })
  @IsEnum(DriverMbtiType)
  type: string;

  @ApiProperty()
  @IsString()
  name: string;
}
