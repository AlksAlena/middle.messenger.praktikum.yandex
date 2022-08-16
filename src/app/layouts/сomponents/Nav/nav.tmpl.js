// language=hbs

export default `
  <ul class="navigation-items">
    {{#each links}}
      <li><a class="navigation-item" href="{{ url }}">{{ title }}</a></li>
    {{/each}}
  </ul>
`;
