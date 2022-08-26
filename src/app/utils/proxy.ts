import { EventBus, EVENTS } from '../modules/event-bus';

export function makePropsProxy<Props extends {}>(props: Props, eventBus: EventBus): ProxyHandler<Props> {
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
  deleteProperty(): boolean {
    throw new Error('Нет доступа');
  },
});
}
