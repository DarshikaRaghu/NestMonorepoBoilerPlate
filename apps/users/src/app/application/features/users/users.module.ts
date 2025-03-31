import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../infrastructure/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../auth/guards/strategies/jwt.strategy';
import { UsersController } from './users.controller';
import { AuthController } from '../auth/auth.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from '../../../infrastructure/repositories/users.repository';
import { AuthService } from '../auth/service/auth.service';
import { UsersEventsExecutor } from './users-events.executor';
import { USERS_REPO } from './repositories/i-users-repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'ORGANIZATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'organization_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [
    UsersController, 
    AuthController,
    UsersEventsExecutor
  ],
  providers: [UsersService, UsersRepository, AuthService, JwtStrategy,
    {
      provide:USERS_REPO,
      useClass:UsersRepository
    }
  ],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
