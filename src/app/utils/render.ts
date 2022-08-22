import { Block } from '../modules/block';

export function render(selector: string, component: Block): HTMLElement {
  const root: HTMLElement = document.querySelector(selector);
  if (!root) {
    throw new Error('Root not found');
  }

  // полностью замещать контент
  // root.innerHTML = '';
  root.appendChild(component.getContent());
  component.dispatchComponentDidMount();

  return root;
}
