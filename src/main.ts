import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersService } from './resources/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);
  await usersService.ensureSuperAdminExists();
  
  // Créer une configuration de document pour Swagger
  const config = new DocumentBuilder()
    .setTitle('Exemple API')
    .setDescription("La description de l'API")
    .setVersion('1.0')
    .addTag('exemple')
    .build();
  
  // Créer un document Swagger avec la configuration
  const document = SwaggerModule.createDocument(app, config);
  
  // Servir le document Swagger via l'UI de Swagger
  SwaggerModule.setup('api', app, document);
  // src/main.ts


  await app.listen(3000);
}

bootstrap();