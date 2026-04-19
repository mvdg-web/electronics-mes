import { PrismaService, UnitModel } from '@mes/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UnitModel[]> {
    return this.prisma.unit.findMany({ include: { history: true } });
  }

  async processScan(sn: string, woId: string, step: string, opId: string) {
    return this.prisma.$transaction(async (tx) => {
      const wo = await tx.workOrder.findUnique({ where: { id: woId } });
      if (!wo) throw new Error('Work Order not found');

      const existingUnit = await tx.unit.findUnique({ where: { serialNumber: sn } });
      if (!existingUnit) {
        const currentCount = await tx.unit.count({ where: { workOrderId: woId } });
        if (currentCount >= wo.quantity) {
          throw new Error(`Cannot scan more units than planned (${wo.quantity}) for this Work Order.`);
        }
      }

      if (wo.status === 'PLANNED') {
        await tx.workOrder.update({
          where: { id: woId },
          data: { status: 'IN_PROGRESS' },
        });
      }

      const unit = await tx.unit.upsert({
        where: { serialNumber: sn },
        update: { currentStep: step },
        create: {
          serialNumber: sn,
          workOrderId: woId,
          partId: wo.partId,
          currentStep: step,
        },
      });

      await tx.unitHistory.create({
        data: {
          unitId: unit.id,
          step,
          result: 'PASS',
          note: `Processed by Operator: ${opId}`,
        },
      });

      return unit;
    });
  }
}
