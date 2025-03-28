import { NestFactory } from '@nestjs/core';
import { OrganizationsModule } from './organizations.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create HTTP server for direct access
  const app = await NestFactory.create(OrganizationsModule);
  
  // Add RabbitMQ microservice for inter-service communication
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'organization_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Organizations API')
    .setDescription('The Organizations API description')
    .setVersion('1.0')
    .addTag('organizations')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start all microservices
  await app.startAllMicroservices();
  // Start HTTP server
  await app.listen(3001);
}
bootstrap();