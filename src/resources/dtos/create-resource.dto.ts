import { IsNotEmpty, IsString } from 'class-validator';
export type ResourceType = "file" | "link";

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: ResourceType;

  body: string;
}

