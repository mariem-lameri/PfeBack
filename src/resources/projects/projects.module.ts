
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectSchema } from './entities/project.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    })
  
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService,JwtStrategy],
  exports: [ProjectsService,PassportModule]
})
export class ProjectsModule {}
