import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { WorkOrderModule } from './work-orders/work-order.module';
import { UserModule } from './users/user.module';
import { PartModule } from './parts/part.module';
import { DatabaseModule } from '@mes/db';
import { UnitModule } from './units/unit.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, '..', 'schema.gql'),
      sortSchema: true,
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DatabaseModule,
    WorkOrderModule,
    UserModule,
    PartModule,
    UnitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
