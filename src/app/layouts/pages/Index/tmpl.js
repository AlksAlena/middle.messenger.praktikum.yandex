// language=hbs

export default `
  <main>
    <div class="content">
      <form class="form" action="">
        <h2>{{formHeader}}</h2>

        <ul class="form-fields">
          {{#each fields}}
            <li class="form-field">
              <label class="label" for="{{name}}">{{label}}</label>
              <input class="input" id="{{name}}" name="{{name}}" type="{{type}}">
            </li>
          {{/each}}
        </ul>
        <a class="link" href="{{link.url}}">{{link.text}}</a>

        {{> submit-button}}
      </form>
    </div>
  </main>
`;
