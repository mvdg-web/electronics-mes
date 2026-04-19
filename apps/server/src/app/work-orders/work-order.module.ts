import { Module } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { WorkOrderResolver } from './work-order.resolver';

@Module({
  providers: [WorkOrderService, WorkOrderResolver],
  exports: [WorkOrderService],
})
export class WorkOrderModule {}
