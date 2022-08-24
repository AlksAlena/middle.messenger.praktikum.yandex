import { nanoid } from 'nanoid';
import { EVENTS, EventBus } from './event-bus';
import { makePropsProxy } from '../utils/proxy';

interface PropsAndChildren {
  props: any;
  children: { [key: string]: Block };
}

export class Block {
  static EVENTS = EVENTS;

  private _element: HTMLElement = null;
  private _meta: any = null;
  protected props: ProxyHandler<any> = null;
  protected children: ProxyHandler<any> = null;
  eventBus: () => EventBus;

  id: string = nanoid(6);

  constructor(propsAndChildren: any = {}) {
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
    const needRerender: boolean = this.componentDidUpdate(oldProps, newProps);
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

  private _getPropsAndChildren(propsAndChildren: any): PropsAndChildren {
    const props: any = {};
    const children: { [key: string]: Block } = {};

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

  private _makePropsProxy(props: any): ProxyHandler<any> {
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
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(ch => context[key] = `<div data-id="id-${ch.id}"></div>`);
        return;
      }
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    fragment.innerHTML = template(context);

    Object.entries(this.children).forEach(([key, child]) => {
      // добавить обработку массива компонентов
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
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
