import { Order } from '@domain/checkout/entity/order';
import OrderItem from '@domain/checkout/entity/order-item';
import Customer from '@domain/customer/entity/customer';
import Address from '@domain/customer/value-object/adress';
import { Product } from '@domain/product/entity/product';
import { CustomerRepository } from '@infrastructure/customer/repository/customer.repository';
import { CustomerModel } from '@infrastructure/customer/repository/sequelize/customer.model';
import { ProductRepository } from '@infrastructure/product/repository/product.repository';
import ProductModel from '@infrastructure/product/repository/sequelize/product.model';
import { Sequelize } from 'sequelize-typescript';
import OrderRepository from './order.repository';
import OrderItemModel from './sequelize/order-item.model';
import OrderModel from './sequelize/order.model';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '1', 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem('1', product.name, product.price, product.id, 2);

    const order = new Order('123', '123', [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });
  it('should find all orders', async () => {
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository();
    const customerRepository = new CustomerRepository();

    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('Street 1', '1', 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customer2 = new Customer('c2', 'Customer 2');
    const address2 = new Address('Street 2', '2', 'Zipcode 2', 'City 2');
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product = new Product('5', 'Product 1', 10);
    await productRepository.create(product);
    const product2 = new Product('3', 'Product 2', 10);
    await productRepository.create(product2);

    const ordemItem = new OrderItem('3', product.name, product.price, product.id, 2);
    const ordemItem2 = new OrderItem('4', product2.name, product2.price, product2.id, 2);

    const order = new Order('3', customer.id, [ordemItem]);
    await orderRepository.create(order);

    const order2 = new Order('10000', customer2.id, [ordemItem2]);
    await orderRepository.create(order2);

    const allOrders = await orderRepository.findAll();
    expect(allOrders.length).toBe(2);
  });
  it('should find one by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '1', 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem('1', product.name, product.price, product.id, 2);

    const order = new Order('123', '123', [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const findOrder = await orderRepository.find(order.id);
    expect(findOrder).toEqual(order);
  });
  it('should be able to update a order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '1', 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const product2 = new Product('345', 'Product 2', 50);
    await productRepository.create(product2);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 10);

    const order = new Order('123', '123', [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const findOrder = await orderRepository.find(order.id);
    findOrder.changeItems([orderItem2]);
    await orderRepository.update(findOrder);

    expect(findOrder.items).toEqual([orderItem2]);
  });
});
