import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@mes/db';
import { UserService } from './user.service';


@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAllUsers() {
    return await this.userService.findAll();
  }
}
