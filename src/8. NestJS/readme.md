# 8. NestJS

### Pipes
- Los `pipes` podemos utilizar para manipular y validar los datos de entrada a un endpoint. 
  De forma que con un pipe puedes automatizar la manipulación de datos entrantes para luego usarlos.
- En el ejemplo simple que hice, utilizo un pipe custom para comprobar que llega un `ID` válido y para que la key `name` del DTO User siempre llegue en mayúsculas.

### Interceptors
- Los `interceptors` podemos utilizarlos para manipular/validar los datos de entrada/salida. También para logear información o cualquier lógica útil necesaria entre petición y respuesta.

- En el ejemplo simple que hice utilizo un interceptor para asegurarnos de que la respuesta del backend siempre devuelva la key `name`del DTO User en mayúsculas.

## Autentificación
- En el caso de una autentificación, un interceptor sería bastante útil para comprobar que en las cabeceras viene el típico `Bearer` y devolver el token desencriptado de primeras al controlador.

- De esta forma se reduciría el boilerplate en todos los controladores a la hora de manipular el token y se centralizaría en 1 solo interceptor esa lógica.


## Datos
- En el caso de gestionar datos de un formulario, por ejemplo, usaría `Pipes` y `DTO` para validar los datos que llegan del front, esto en un caso sencillo.

- En casos mas complicados que tuviéramos un controller que necesite en todos sus endpoints:
  - Loggear.
  - Enviar un mail.
  - Cualquier lógica que pueda necesitar de un servicio.
  - Sanitizar datos.
  - Control de efectos secundarios tipo actualizar un cache o base de datos.

  Para aplicar estas lógicas en todos los endpoints del controlador un `interceptor` sería quizás la mejor solución para centralizarlo todo.

## Gestión de errores
- Los errores de validación por lo general se suele cumplir bien en la mayoría de casos utilizando DTO y Pipes para casos concretos.

---

# Ejemplo de NestJS con Interceptors & DTO & Pipes
- En la carpeta `prueba-tecnica` de esta prueba hice un ejemplo muy simple solo para el uso de interceptors, dto y pipes.
 No me esforcé mucho en la arquitectura, tengo que decir 🤣🤣.


## Ejecución
```bash
npm run start:dev
# http://localhost:3000
```

## Datos mockeados
- Los datos mockeados tienen la key name en minúscula para luego ver los resultados una vez pasan por el Pipe y el Interceptor.

```ts
const usersData: UserDTO[] = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
  { id: 4, name: 'test4' },
  { id: 5, name: 'test5' },
  { id: 6, name: 'test6' },
  { id: 7, name: 'test7' },
  { id: 8, name: 'test8' },
]
```

## DTO User
```ts
class UserDTO {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  readonly id: number;

  @Optional()
  @Type(() => String)
  name: string;
}
```

## Interceptor
```ts
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
```

## Pipe Custom que valida el user y pasa el name a mayusculas
```ts
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
```

## Controlador
```ts
@Controller()
@UseInterceptors(new UserInterceptor())
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('/user/:id')
  @UsePipes(new UserValidationPipe())
  async getUser(@Param() user: UserDTO): Promise<UserDTO> {
    return this.appService.getUserById(user.id);
  }

  @Patch('/user')
  @UsePipes(new UserValidationPipe())
  async updateUser(@Body() user: UserDTO): Promise<UserDTO> {
    return this.appService.updateUser(user);
  }

}

```



## Endpoints
- `GET` /user/:id
  - Busca un usuario segun el id
- `PATCH` /user

  ```json
  {
    "id": 1,
    "name": "re7User"
  }
  ```
  - Actualiza el nombre de un usuario.

---

# Comentarios
- En el ejemplo podría haber hecho una estructura de carpetas mejor y no reutilizar el controlador principal para crear los endpoints `/user`. Pero para la muestra simple del uso de estas cosas me pareció suficiente.