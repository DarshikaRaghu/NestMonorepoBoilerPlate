import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Organization {
  @ApiProperty({ description: 'The unique identifier of the organization' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the organization' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The email address of the organization' })
  @Column({ unique: true })
  email: string;
}