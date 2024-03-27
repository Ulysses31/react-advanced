import { RecordDto } from '../entities';
import BaseService from './base/base.service';

export default class RecordsService extends BaseService<RecordDto> {
  constructor() {
    super('records');
  }
}
