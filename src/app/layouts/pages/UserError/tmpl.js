// language=hbs

export default `
  <main>
    <div class="content">
      <h1>{{pageHeader}}</h1>

      <p>
        <a class="link" href="{{ link.url }}">{{ link.text }}</a>
      </p>
    </div>
  </main>
`;
