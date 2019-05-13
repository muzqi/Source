declare var template: any;

interface Item {
  name: string;
  value: string;
}

interface Data {
  title: string;
  list: Array<Item>;
}

type DocbarTmpl = (data: Data) => string;

const docbarTmpl: DocbarTmpl = (data) => {
  const source = `
    <div class="tmpl-docbar">
      <div class="title">
        <%= title %>
      </div>

      <div class="main">
        <% for (var i = 0; i < list.length; i ++) { %>
          <div class="item">
            <div class="name">
              <%= list[i].name %>
            </div>
            <div class="value-box">
              <div class="triangle"></div>
              <div class="value">
                <%= list[i].value %>
              </div>
            </div>
          </div>
        <% } %>

        <div class="robot"></div>
      </div>
    </div>
  `

  const render = template.compile(source);
  const html = render(data);
  return html;
}
