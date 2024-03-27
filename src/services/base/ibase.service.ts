export interface IBaseService<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): void;
}
