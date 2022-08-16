// language=hbs

export default `
  <nav class="navigation">
    <ul class="navigation-items">
      {{#each links}}
        <li>
          <a class="navigation-item" href="{{url}}">{{text}}</a>
        </li>
      {{/each}}
    </ul>
  </nav>
`;
