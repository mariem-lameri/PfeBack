import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CustomMongooseModule } from './mongodb/mongodb.module';
import { AuthModule } from './resources/auth/auth.module';
import { RoleModule } from './resources/role/role.module';
import { ProjectsModule } from './resources/projects/projects.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { TicketsModule } from './resources/tickets/tickets.module';

@Module({
  imports: [UsersModule,
    CustomMongooseModule,
    ConfigModule.forRoot({
    isGlobal: true
  }),
    AuthModule,
    RoleModule,
    ProjectsModule,
    TicketsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly publicRoutes = ['/auth']
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).exclude('/auth');
  }
}
