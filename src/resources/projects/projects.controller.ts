import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto'; 
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Permissions } from '../auth/permission.decorator';
import { Role } from '../role/entities/role.entity';
import { AuthenticationGuard } from '../auth/authenticationGuard';
import { JwtStrategy } from '../auth/jwt.strategy';

@ApiTags('Projects')
//@UseGuards(AuthenticationGuard,PermissionGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  //@Roles(Role.Admin)
  @ApiOperation({ summary: 'Crée un nouveau projet' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Assurez-vous que l'authentification JWT est requise pour créer un projet
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
  @ApiOperation({summary:'mise à jour du projet'})
  @ApiResponse({ status:200, description: 'Updated.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Assurez-vous que l'authentification JWT est requise pour mettre à jour un projet
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  //@Roles(Role.Admin)
  @ApiOperation({summary:'suppression du projet par id'})
  @ApiResponse({ status:200, description: 'Deleted.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Assurez-vous que l'authentification JWT est requise pour supprimer un projet
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
