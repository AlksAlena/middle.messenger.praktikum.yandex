import { Block } from '../modules/block';

export function render(selector: string, component: Block): Node {
  const root: Node = document.querySelector(selector);
  if (root) {
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
  }

  return root;
}
