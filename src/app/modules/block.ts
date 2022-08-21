import EventBus from './event-bus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

interface BlockMeta {
  tagName: string;
  props: { [key: string]: any };
}

export class Block {
  static EVENTS = EVENTS;

  private _element: HTMLElement = null;
  private _meta: BlockMeta = null;

  props: ProxyHandler<BlockMeta> = null;
  eventBus: () => EventBus;

  constructor(tagName: string = 'div', props: { [key: string]: any } = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._meta = { tagName, props };
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    const tagName: string = this._meta?.tagName;
    this._element = this._createDocumentElement(tagName);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: { [key: string]: any },
    newProps: { [key: string]: any },
  ): void {
    const needRerender: boolean = this.componentDidUpdate(oldProps, newProps);
    if (needRerender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(
    oldProps: { [key: string]: any },
    newProps: { [key: string]: any },
  ): boolean {
    return true;
  }

  setProps = (nextProps: { [key: string]: any }) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  private _render(): void {
    const block: string = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

  protected render(): any {}

  getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props): ProxyHandler<BlockMeta> {
    const block: Block = this;
    return new Proxy(props, {
      get(target, prop): any {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value): boolean {
        const oldValue = { ...target };
        target[prop] = value;
        block.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
        return true;
      },
      deleteProperty(target, prop): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
