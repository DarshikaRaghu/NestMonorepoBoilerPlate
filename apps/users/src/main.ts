import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/infrastructure/app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create HTTP server for direct access
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Add RabbitMQ microservice for inter-service communication
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'user_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // Start all microservices first
  await app.startAllMicroservices();
  // Then start HTTP server
  await app.listen(3000);
  console.log(`Users service is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation is available at: ${await app.getUrl()}/api`);
}
bootstrap();
