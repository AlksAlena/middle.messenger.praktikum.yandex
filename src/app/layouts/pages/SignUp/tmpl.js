// language=hbs

export default `
  <main>
    <div class="content">
      <form class="form" action="">
        <h2>{{formTitle}}</h2>

        <ul class="form-fields">
          {{#each fields}}
            <li class="form-field">
              <label class="label" for="{{name}}">{{label}}</label>
              <input class="input" id="{{name}}" name="{{name}}" type="{{type}}">
            </li>
          {{/each}}
        </ul>

        <p class="button-wrapper">
          <button class="button">{{submitButtonText}}</button>
        </p>
      </form>
    </div>
  </main>
`;
