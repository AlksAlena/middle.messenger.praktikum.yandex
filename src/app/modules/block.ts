import { nanoid } from 'nanoid';
import EventBus from './event-bus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

export class Block {
  static EVENTS = EVENTS;

  private _element: HTMLElement = null;
  private _meta: any = null;
  protected props: ProxyHandler<any> = null;
  eventBus: () => EventBus;

  constructor(props: any = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._meta = { props, __id: nanoid(6) };
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
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    const needRerender: boolean = this. componentDidUpdate(oldProps, newProps);
    if (needRerender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  private _render(): void {
    const fragment: DocumentFragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props): ProxyHandler<any> {
    const block: Block = this;
    return new Proxy(props, {
      get(target: any, prop: string | symbol): any {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string | symbol, value: any): boolean {
        const oldValue = { ...target };
        target[prop] = value;
        block.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
        return true;
      },
      deleteProperty(target: any, prop: string | symbol): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  private _addEvents(): void {
    const events: { [event: string]: () => void } = (this.props as any).events;
    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _removeEvents(): void {
    const events: { [event: string]: () => void} = (this.props as any).events;
    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    })
  }

  private _createDocumentElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }

  /**
   * Используется HTMLTemplateElement под тегом 'template',
   * такой элемент не вставляется сам по себе, а вставляет свой контент.
   * Служит оберткой и облегчает манипулирование своим контентом.
   * Внутри себя имеет DocumentFragment, из которого берется firstChild,
   * т.е. первый элемент верхнего уровня.
   * Использовать DocumentFragment напрямую, не как часть HTMLTemplateElement неудобно,
   * потому что внутрь фрагмента нужно вставить разметку из шаблонизатора,
   * а у фрагмента нет соответствующего апи. Однако оно есть у HTMLTemplateElement.
   *
   * @param template
   * @param context
   * @protected
   */
  protected compile(template: (context: any) => string, context: any): DocumentFragment {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template(context);
    return fragment.content;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
