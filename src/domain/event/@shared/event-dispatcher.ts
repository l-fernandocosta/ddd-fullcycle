import { EventDispatcherInterface } from './event-dispatcher.interface';
import { EventHandlerInterface } from './event-handler.interface';
import { EventInterface } from './event.interface';

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    throw new Error('Method not implemented.');
  }
  register(event_name: string, handler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[event_name]) {
      this.eventHandlers[event_name] = [];
    }

    this.eventHandlers[event_name].push(handler);
  }
  unregister(event_name: string, handler: EventHandlerInterface<EventInterface>): void {
    throw new Error('Method not implemented.');
  }
  unregisterAll(): void {
    throw new Error('Method not implemented.');
  }
}
