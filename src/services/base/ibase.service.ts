export interface IBaseService<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): void;
}
