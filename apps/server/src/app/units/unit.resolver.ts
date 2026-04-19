import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Unit } from '@mes/db';
import { UnitService } from './unit.service';


@Resolver(() => Unit)
export class UnitResolver {
  constructor(private unitService: UnitService) {}

  @Query(() => [Unit])
  async findAllUnits() {
    return await this.unitService.findAll();
  }

  @Mutation(() => Unit, { name: 'scanUnit' }) // Standardized Name
  async scanUnit(
    @Args('serialNumber') serialNumber: string,
    @Args('workOrderId') workOrderId: string,
    @Args('step') step: string,
    @Args('operatorId') operatorId: string,
  ) {
    return this.unitService.processScan(
      serialNumber,
      workOrderId,
      step,
      operatorId,
    );
  }
}
