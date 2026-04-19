import { Module } from '@nestjs/common';
import { PartResolver } from './part.resolver';
import { PartService } from './part.service';

@Module({
  providers: [PartService, PartResolver],
  exports: [PartService],
})
export class PartModule {}
