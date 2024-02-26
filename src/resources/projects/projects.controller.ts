import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/role.decorator';
import { Role } from '../role/entities/role.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crée un nouveau projet' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les projets' })
  @ApiResponse({ status: 200, description: 'Ok.' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un projet par son ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'mise à jour du projet' })
  @ApiResponse({ status: 200, description: 'Updated.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'suppression du projet par id' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
  @Delete(':name')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'suppression du projet par nom' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async removeByName(@Param('name') name: string) {
    const deleted = await this.projectsService.deleteByName(name);
    if (!deleted) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Project deleted successfully', name };
  }
}
