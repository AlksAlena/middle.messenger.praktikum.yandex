import render from "./utils/render";
import Button from "./сomponents/Button/Button";
import Input from "./сomponents/Input/Input";

const button = new Button({
  text: 'Click me',
  class: 'button'
});

const input = new Input({
  label: 'Имя',
  name: 'first_name',
  type: 'text'
});

document.addEventListener('DOMContentLoaded', () => {
  render(".app", input);
  render(".app", button);
});

