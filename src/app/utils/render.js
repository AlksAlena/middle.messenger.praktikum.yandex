export default function render(query, block) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }

  return root;
}
