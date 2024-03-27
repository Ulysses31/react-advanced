import { CategoryDto } from '../entities';
import BaseService from './base/base.service';

export default class CategoriesService extends BaseService<CategoryDto> {
  constructor() {
    super('categories');
  }
}
