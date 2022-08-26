export enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

export class EventBus {
  listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event]
      .filter(listener => listener !== callback);
  }

  // TS error: A spread argument must either have a tuple type or be passed to a rest parameter
  emit(event: string, ...args: any): void {
    // @ts-ignore
    this.listeners[event].forEach(listener => listener(...args));
  }
}
