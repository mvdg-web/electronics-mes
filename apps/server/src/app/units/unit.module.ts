import { Module } from '@nestjs/common';
import { UnitResolver } from './unit.resolver';
import { UnitService } from './unit.service';

@Module({
  providers: [UnitService, UnitResolver],
  exports: [UnitService],
})
export class UnitModule {}
