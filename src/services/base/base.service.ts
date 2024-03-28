import axios from './axios.service';
import { IBaseService } from './ibase.service';

export default class BaseService<T> implements IBaseService<T> {
  private _apiEndPoint: string;

  constructor(apiEndPoint: string) {
    this._apiEndPoint = apiEndPoint;
  }

  public async findAll(): Promise<T[]> {
    try {
      const response = await axios.get(this._apiEndPoint);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  public async findById(id: number): Promise<T> {
    try {
      const response = await axios.get<T>(`${this._apiEndPoint}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  public async create(data: T): Promise<T> {
    try {
      const response = await axios.post<T>(this._apiEndPoint, data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  public async update(id: number, data: T): Promise<T> {
    try {
      const response = await axios.put<T>(`${this._apiEndPoint}/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this._apiEndPoint}/${id}`);
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
