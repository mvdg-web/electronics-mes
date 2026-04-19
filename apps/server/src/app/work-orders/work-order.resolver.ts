import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { WorkOrderService } from './work-order.service';
import { Part, Unit, WorkOrder } from '@mes/db';

@Resolver(() => WorkOrder)
export class WorkOrderResolver {
  constructor(private workOrderService: WorkOrderService) {}
  @Query(() => [WorkOrder], { name: 'findAllWorkOrders' })
  async findAllWorkOrders() {
    return this.workOrderService.findAll();
  }

  @Mutation(() => WorkOrder, { name: 'createWorkOrder' })
  async createWorkOrder(
    @Args('partId') partId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.workOrderService.create(partId, quantity);
  }

  @Mutation(() => WorkOrder, { name: 'updateWorkOrderStatus' })
  async updateWorkOrderStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ) {
    return this.workOrderService.updateStatus(id, status);
  }

  @ResolveField(() => Int)
  async unitCount(@Parent() workOrder: WorkOrder) {
    return this.workOrderService.getCount(workOrder.id);
  }

  @ResolveField(() => Part)
  async part(@Parent() workOrder: WorkOrder) {
    return workOrder['part'];
  }

  @ResolveField(() => [Unit])
  async units(@Parent() workOrder: WorkOrder) {
    return this.workOrderService.getUnits(workOrder.id);
  }
}
