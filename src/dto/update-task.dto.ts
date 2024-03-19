import { IsBoolean, IsISBN, IsOptional, IsString } from "class-validator"

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string
  
  @IsBoolean()
  @IsOptional()
  done?: boolean
}