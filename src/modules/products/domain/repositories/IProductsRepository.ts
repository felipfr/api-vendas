import { IProduct } from '../models/IProduct';
import { IFindProducts } from '../models/IFindProducts';
import { ICreateProduct } from '../models/ICreateProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<IProduct>;
  findAll(): Promise<IProduct[]>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  remove(product: IProduct): Promise<void>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
