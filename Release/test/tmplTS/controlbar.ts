declare var template: any;

interface Item {
  title: string;
  imgUrl: string;
  onClick: string;
}

interface Data {
  list: Array<Item>;
};

type ControlbarTmpl = (data: Data) => string;

const controlbarTmpl: ControlbarTmpl = (data) => {
  const source = `
    <div class="tmpl-controlbar">
      <% for (var i = 0; i < list.length; i ++) { %>
        <a
          class="item"
          href=<%= list[i].href %>
        >
          <div class="icon">
            <img src=<%= list[i].imgUrl %> />
          </div>
          <div class="text">
            <%= list[i].title %>
          </div>
        </a>
      <% } %>
    </div>
  `

  const render = template.compile(source);
  const html = render(data);
  return html;
}
