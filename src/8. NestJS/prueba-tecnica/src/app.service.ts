import { Injectable } from '@nestjs/common';
import { usersData } from './mock/users.mock';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AppService {
  mockData: UserDTO[] = usersData;

  getUserById(id: number): UserDTO {
    const userFound: UserDTO = this.mockData.find(user => user.id == id)
    return userFound
  }

  updateUser(user: UserDTO): UserDTO {
    const userFound: UserDTO = this.mockData.find(_user => _user.id == user.id)
    userFound.name = user.name;
    return userFound;
  }
}
