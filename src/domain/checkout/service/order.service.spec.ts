import { Order } from '@domain/checkout/entity/order';
import OrderItem from '@domain/checkout/entity/order-item';
import Customer from '@domain/customer/entity/customer';
import { OrderService } from './order.service';

describe('Order service unit test', () => {
  it('should get total of all orders', () => {
    const item = new OrderItem('i1', 'Item 1', 100, 'p1', 1);
    const item2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);

    const order = new Order('o1', 'customerId', [item]);
    const order2 = new Order('o2', 'customerId2', [item2]);
    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
  it('should place an order', () => {
    const customer = new Customer('c1', 'customer');
    const orderItem1 = new OrderItem('i1', 'Item 1', 10, 'p1', 1);

    const order = OrderService.placeOrder(customer, [orderItem1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
