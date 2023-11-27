
import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, BadRequestException } from '@nestjs/common'; 
import { UserDTO } from 'src/dto/user.dto';


@Injectable() 
export class UserValidationPipe implements PipeTransform { 
  transform(user: UserDTO, metadata: ArgumentMetadata) {
    
    // Filtramos un ID invalido.
    if(user.id < 0) throw new BadRequestException(HttpStatus.BAD_REQUEST);

    // Capitalizamos el nombre para que siempre este en mayusculas.
    if(user.name) {
      user.name = user.name.toUpperCase();
    }

    return user 
  } 
} 