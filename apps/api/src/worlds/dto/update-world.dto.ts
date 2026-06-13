import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWorldDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
