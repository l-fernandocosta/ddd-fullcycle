import { Order } from '@domain/checkout/entity/order';
import OrderItem from '@domain/checkout/entity/order-item';
import { OrderRepositoryInterface } from '@domain/checkout/repository/order.repository.interface';
import OrderItemModel from './sequelize/order-item.model';
import OrderModel from './sequelize/order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        items: entity.items,
        total: entity.total,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    return new Order(
      order.id,
      order.customer_id,
      order.items.map(
        (item) =>
          new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      )
    );
  }
  async findAll(): Promise<Order[]> {
    const ordersModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = ordersModels.map((order) => {
      const orderItems = order.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });
      return new Order(order.id, order.customer_id, orderItems);
    });

    return orders;
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: Number(entity.id),
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
