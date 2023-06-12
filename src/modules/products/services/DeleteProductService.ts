import AppError from '@shared/infra/http/errors/AppError';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
