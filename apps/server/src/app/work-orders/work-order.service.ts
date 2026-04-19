import { PrismaService, WorkOrderModel } from '@mes/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkOrderService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<WorkOrderModel[]> {
    return this.prisma.workOrder.findMany({ include: { part: true } });
  }

  async create(partId: string, quantity: number): Promise<WorkOrderModel> {
    return this.prisma.workOrder.create({
      data: {
        workOrderNumber: `WO-${Math.random().toString(36).toUpperCase().substring(2, 7)}`,
        quantity,
        status: 'PLANNED',
        partId,
      },
      include: { part: true },
    });
  }

  async updateStatus(id: string, status: string): Promise<WorkOrderModel> {
    return this.prisma.workOrder.update({
      where: { id },
      data: { status },
      include: { part: true },
    });
  }

  getCount(id: string) {
    return this.prisma.unit.count({ where: { workOrderId: id } });
  }

  getUnits(id: string) {
    return this.prisma.unit.findMany({
      where: { workOrderId: id },
      include: { history: true },
    });
  }
}
