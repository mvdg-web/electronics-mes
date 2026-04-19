import { Injectable } from '@nestjs/common';
import { PrismaService, PartModel } from '@mes/db';


@Injectable()
export class PartService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PartModel[]> {
    return this.prisma.part.findMany()
  }
}
