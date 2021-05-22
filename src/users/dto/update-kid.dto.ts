import { PartialType } from '@nestjs/swagger';

import { CreateKidDto } from './create-kid.dto';

export class UpdateKidDto extends PartialType(CreateKidDto) {}
