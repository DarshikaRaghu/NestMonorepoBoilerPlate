import { Controller, Post, Body, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User has been successfully registered' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async register(@Body() registerDto: User) {
    // Check if username or email already exists
    const existingUser = await this.usersService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Create new user
    const user = await this.usersService.create(registerDto);
    return this.authService.login(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to get access token' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
} 