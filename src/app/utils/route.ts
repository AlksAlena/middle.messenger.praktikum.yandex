import { render } from './render';
import { Block } from '../modules/block';

export class Route {
  private _pathname: string;
  private _blockClass: Block<any>;
  private _block: Block<any> | null;
  private _props: { rootQuery: string };

  constructor(pathname: string, view: Block<any>, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}
