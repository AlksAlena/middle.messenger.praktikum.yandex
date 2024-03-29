import { nanoid } from 'nanoid';
import { EVENTS, EventBus } from './event-bus';
import { makePropsProxy } from '../utils/proxy';


export abstract class Block<Props extends {}> {
  static EVENTS = EVENTS;

  private _element: HTMLElement | null = null;
  private _meta: { props: any } = null;
  protected props: ProxyHandler<Record<string, any>> = null;
  protected children: ProxyHandler<Record<string, Block<Props>>> = null;
  eventBus: () => EventBus;

  id: string = nanoid(6);

  constructor(propsAndChildren: Props) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getPropsAndChildren(propsAndChildren);
    this.props = this._makePropsProxy(props);
    this.children = this._makePropsProxy(children);
    this._meta = { props };

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const needRerender: boolean = this.componentDidUpdate(oldProps, newProps);
    if (needRerender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    const { children, props } = this._getPropsAndChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }
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

  private _getPropsAndChildren(propsAndChildren: Props): { props: Record<string, any>, children: Record<string, Block<Props>> } {
    const props: Record<string, any> = {};
    const children: { [key: string]: Block<Props> } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(elem => elem instanceof Block)) {
        console.log('array of children');
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private _makePropsProxy<T extends {}>(props: T): ProxyHandler<T> {
    return makePropsProxy(props, this.eventBus());
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

  private _removeEvents(): void {
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
  protected compile(template: (context: Props) => string, context: Props): DocumentFragment {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        // @ts-ignore
        context[key] = child.map(ch => context[key] = `<div data-id="id-${ch.id}"></div>`);
        return;
      }
      // @ts-ignore
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    fragment.innerHTML = template(context);

    Object.values(this.children).forEach(child => {
      // добавить обработку массива компонентов
      const stub: Element | null = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
