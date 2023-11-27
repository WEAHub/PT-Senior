import { Body, Controller, Get, Param, Patch, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { UserValidationPipe } from './pipes/user.validation.pipe';
import { UserDTO } from './dto/user.dto';
import { UserInterceptor } from './interceptors/user.interceptor';

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
