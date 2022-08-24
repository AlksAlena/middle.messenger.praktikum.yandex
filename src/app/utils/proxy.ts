import { EventBus, EVENTS } from '../modules/event-bus';

export function makePropsProxy(props: any, eventBus: EventBus): ProxyHandler<any> {
return new Proxy(props, {
  get(target: any, prop: string | symbol): any {
    const value = target[prop];
    return typeof value === 'function' ? value.bind(target) : value;
  },
  set(target: any, prop: string | symbol, value: any): boolean {
    const oldValue = { ...target };
    target[prop] = value;
    eventBus.emit(EVENTS.FLOW_CDU, oldValue, target);
    return true;
  },
  deleteProperty(target: any, prop: string | symbol): boolean {
    throw new Error('Нет доступа');
  },
});
}
