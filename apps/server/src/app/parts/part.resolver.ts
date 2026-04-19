import { Query, Resolver } from '@nestjs/graphql';
import { Part } from '@mes/db';
import { PartService } from './part.service';


@Resolver(() => Part)
export class PartResolver {
  constructor(private partService: PartService) {}

  @Query(() => [Part])
  async findAllParts() {
    return await this.partService.findAll()
  }
}
