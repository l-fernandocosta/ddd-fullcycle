import { ProductCreatedEvent } from '@domain/product/event/product-created.event';
import { EventHandlerInterface } from '@shared/event/event-handler.interface';

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email...');
  }
}
