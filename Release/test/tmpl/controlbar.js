;
var controlbarTmpl = function (data) {
    var source = "\n    <div class=\"tmpl-controlbar\">\n      <% for (var i = 0; i < list.length; i ++) { %>\n        <a\n          class=\"item\"\n          href=<%= list[i].href %>\n        >\n          <div class=\"icon\">\n            <img src=<%= list[i].imgUrl %> />\n          </div>\n          <div class=\"text\">\n            <%= list[i].title %>\n          </div>\n        </a>\n      <% } %>\n    </div>\n  ";
    var render = template.compile(source);
    var html = render(data);
    return html;
};
