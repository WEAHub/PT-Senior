import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // Interceptor para asegurarnos que el name del user se envia siempre en mayuscula.
    return next.handle()
      .pipe(
        map((user: UserDTO) => ({
          ...user,
          name: user.name.toUpperCase()
        }))
      );
  }
}