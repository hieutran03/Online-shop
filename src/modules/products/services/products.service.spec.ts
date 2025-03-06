import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindByIdQuery } from '../queries/impl/find-by-id.query';
import { FindByFilterQuery } from '../queries/impl/find-by-filter.query';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { UpdateProductCommand } from '../commands/impl/update-product.command';
import { DeleteProductCommand } from '../commands/impl/delete-product.command';
import { QueryFilterDto } from '../dtos/query-options.dto';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should call queryBus.execute with FindByIdQuery', async () => {
      const productId = 1;
      const expectedResult = { id: productId, name: 'Test Product' };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedResult);

      const result = await service.findById(productId);

      expect(queryBus.execute).toHaveBeenCalledWith(
        new FindByIdQuery(productId),
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw exception if product not found', async () => {
      const productId = 1;

      jest
        .spyOn(queryBus, 'execute')
        .mockRejectedValue(new NotFoundException());

      await expect(service.findById(productId)).rejects.toThrow(
        NotFoundException,
      );

      expect(queryBus.execute).toHaveBeenCalledWith(
        new FindByIdQuery(productId),
      );
    });
  });

  describe('findByFilter', () => {
    it('should call queryBus.execute with FindByFilterQuery', async () => {
      const queryFilterDto: QueryFilterDto = { name: 'test' };
      const expectedResult = [{ id: 1, name: 'test' }];

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedResult);

      const result = await service.findByFilter(queryFilterDto);

      expect(queryBus.execute).toHaveBeenCalledWith(
        new FindByFilterQuery(queryFilterDto),
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createProduct', () => {
    it('should call commandBus.execute with CreateProductCommand', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        price: 100,
        description: 'Test',
        categories: [1],
        images: 'test',
      };
      const expectedResult = { id: 1, ...createProductDto };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(expectedResult);

      const result = await service.createProduct(createProductDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateProductCommand(createProductDto),
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateProduct', () => {
    it('should call commandBus.execute with UpdateProductCommand', async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
        description: 'Test',
        categories: [1],
        images: 'test',
      };
      const expectedResult = { id: productId, ...updateProductDto };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(expectedResult);

      const result = await service.updateProduct(productId, updateProductDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new UpdateProductCommand(productId, updateProductDto),
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw exception if product not found', async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
        description: 'Test',
        categories: [1],
        images: 'test',
      };

      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValue(new NotFoundException());

      await expect(service.updateProduct(productId, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(commandBus.execute).toHaveBeenCalledWith(
        new UpdateProductCommand(productId, updateProductDto),
      );
    });
  });

  describe('deleteProduct', () => {
    it('should call commandBus.execute with DeleteProductCommand', async () => {
      const productId = 1;
      const expectedResult = { id: productId, name: 'Deleted Product' };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(expectedResult);

      const result = await service.deleteProduct(productId);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new DeleteProductCommand(productId),
      );
      expect(result).toEqual(expectedResult);
    });
    it('should throw exception if product not found', async () => {
      const productId = 1;

      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValue(new NotFoundException());

      await expect(service.deleteProduct(productId)).rejects.toThrow(
        NotFoundException,
      );

      expect(commandBus.execute).toHaveBeenCalledWith(
        new DeleteProductCommand(productId),
      );
    })
  });
});
