import { Exclude } from 'class-transformer';
import { IsNumber, IsString, IsUrl, IsUUID, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class User {
  @IsUUID()
  @Exclude()
  id: string;

  @IsString()
  nickname: string;

  @IsNumber()
  @Min(1)
  kidAge: string;

  @IsUrl()
  kidAvatarUrl: string;

  @IsString()
  kidName: string;

  constructor(attributes?: Partial<User>) {
    if (!attributes) {
      return;
    }

    if (attributes.id) {
      this.id = attributes.id;
    } else {
      this.id = uuidv4();
    }
    this.nickname = attributes.nickname;
    this.kidAge = attributes.kidAge;
    this.kidAvatarUrl = attributes.kidAvatarUrl;
    this.kidName = attributes.kidName;
  }
}
