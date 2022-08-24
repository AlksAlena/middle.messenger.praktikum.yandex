export default class EventBus {
  listeners: { [key: string]: Array<() => void> };

  constructor() {
    this.listeners = {};
  }

  on(event, callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void): void {
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
