import { Injectable } from '@nestjs/common';
import { PrismaService, UserModel } from '@mes/db';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }
}
