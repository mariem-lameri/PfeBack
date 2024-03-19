import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}


  @Post()
  @ApiOperation({ summary: 'créer un nouveau role' })
  @ApiResponse({ status: 200, description: 'Le rôle a été créé avec succès.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiBearerAuth()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const existedRole = await this.roleService.findOneByName(
      createRoleDto.name,
    );
    if (existedRole)
      throw new HttpException('Rôle dupliqué', HttpStatus.CONFLICT);
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les roles' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les rôles retournée avec succès.',
    type: [Role],
  }) // Utilisez `type: [Role]` pour indiquer un tableau de rôles
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiBearerAuth()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'mise à jour du role par id' })
  @ApiResponse({
    status: 200,
    description: 'Rôle mis à jour avec succès.',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Données invalides fournies.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'suppression du role par id' })
  @ApiResponse({ status: 200, description: 'Rôle supprimé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    this.roleService.delete(id);
  }
}
