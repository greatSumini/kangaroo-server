import { OmitType } from '@nestjs/swagger';

import { Driver } from '../entities/driver.entity';

export class CreateDriverDto extends OmitType(Driver, ['id']) {}
