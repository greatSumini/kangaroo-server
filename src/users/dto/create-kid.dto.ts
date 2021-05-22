import { OmitType } from '@nestjs/swagger';

import { Kid } from '../entities/kid.entity';

export class CreateKidDto extends OmitType(Kid, ['id']) {}
