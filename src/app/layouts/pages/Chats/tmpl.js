// language=hbs

export default `
  <main>
    <div class="content">
      <div class="chats-wrapper">
        <ul class="chats">
          {{#each chats}}
            <li class="chat-title">
              <div class="title-username">
                <a href="./chats.hbs"><span>{{userName}}</span></a>
              </div>
              <div class="title-status"></div>
            </li>
          {{/each}}
        </ul>

        <section class="active-chat">
          <ul class="messages">
            {{#if messages}}
              {{#each messages}}
                <li>
                  <div class="message">
                    <p>{{text}}</p>
                    <p>статус: {{status}}</p>
                    <p>дата отправки: {{date}}</p>
                  </div>
                </li>
              {{/each}}
            {{/if}}
          </ul>

          <div>
            <form class="editor" action="">
              <textarea class="editor-message"
                        rows="2"
                        name="message"
                        placeholder="Введите сообщение"></textarea>
                {{> submit-button}}
            </form>
          </div>
        </section>
      </div>
    </div>
  </main>
`;
