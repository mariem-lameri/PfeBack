import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CustomMongooseModule } from './mongodb/mongodb.module';
import { AuthModule } from './resources/auth/auth.module';
import { ProjectsModule } from './resources/projects/projects.module';

@Module({
  imports: [UsersModule,
    CustomMongooseModule,
    ConfigModule.forRoot({
    isGlobal: true
  }),
    AuthModule,
    ProjectsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
