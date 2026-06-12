import { IsNotEmpty, IsString } from 'class-validator';
export class CreateWorldDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
