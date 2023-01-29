import { EventDispatcherInterface } from './event-dispatcher.interface';
import { EventHandlerInterface } from './event-handler.interface';
import { EventInterface } from './event.interface';

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  register(event_name: string, handler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[event_name]) {
      this.eventHandlers[event_name] = [];
    }
    this.eventHandlers[event_name].push(handler);
  }
  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    console.log(this.eventHandlers);
    return this.eventHandlers;
  }
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler: EventHandlerInterface) => {
        eventHandler.handle(event);
      });
    }
  }
  unregister(event_name: string, handler: EventHandlerInterface<EventInterface>): void {
    if (this.eventHandlers[event_name]) {
      const index = this.eventHandlers[event_name].indexOf(handler);
      if (index !== -1) {
        this.eventHandlers[event_name].splice(index, 1);
      }
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
