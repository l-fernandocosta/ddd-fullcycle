import { EventHandlerInterface } from './event-handler.interface';
import { EventInterface } from './event.interface';

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(event_name: string, handler: EventHandlerInterface): void;
  unregister(event_name: string, handler: EventHandlerInterface): void;
  unregisterAll(): void;
}
