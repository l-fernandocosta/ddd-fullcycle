import { Order } from '@domain/checkout/entity/order';
import RepositoryInterface from '@shared/repository/repository-interface';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
