import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoriesController } from './userstory.controller';
import { UserStory, UserStorySchema } from './entities/userstory.entity';
import { Project, ProjectSchema } from 'src/resources/projects/entities/project.entity';
import { UserStoriesService } from './userstory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserStory.name, schema: UserStorySchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [UserStoriesController],
  providers: [UserStoriesService],
})
export class UserStoriesModule {}
