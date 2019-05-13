declare var template: any;

interface Data {
  title: string;
  list: Array<string>;
};

type OrderbarTmpl = (data: Data) => string;

const orderbarTmpl: OrderbarTmpl = (data) => {
  const source = `
    <div class="tmpl-orderbar">
      <div class="title">
        <%= title %>
      </div>

      <div class="list">
        <% for (var i = 0; i < list.length; i ++) { %>
          <div class="text">
            <%= list[i] %>
          </div>
        <% } %>
      </div>
    </div>
  `;

  const render = template.compile(source);
  const html = render(data);
  return html;
}
