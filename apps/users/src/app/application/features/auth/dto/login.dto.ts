import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
    username: string;
  
    @ApiProperty({ description: 'Password of the user', example: 'securepassword123' })
    password: string;
  }