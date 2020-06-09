import { IsNotEmpty, IsString } from 'class-validator';
import {Resource} from "../../resources/interfaces/Resource";

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  body: string;
  resources: Resource[]
}
