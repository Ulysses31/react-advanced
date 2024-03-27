import { UserDto } from '../entities';
import BaseService from './base/base.service';

export default class UsersService extends BaseService<UserDto> {
  constructor() {
    super('users');
  }
}
