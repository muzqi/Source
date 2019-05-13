var docbarTmpl = function (data) {
    var source = "\n    <div class=\"tmpl-docbar\">\n      <div class=\"title\">\n        <%= title %>\n      </div>\n\n      <div class=\"main\">\n        <% for (var i = 0; i < list.length; i ++) { %>\n          <div class=\"item\">\n            <div class=\"name\">\n              <%= list[i].name %>\n            </div>\n            <div class=\"value-box\">\n              <div class=\"triangle\"></div>\n              <div class=\"value\">\n                <%= list[i].value %>\n              </div>\n            </div>\n          </div>\n        <% } %>\n\n        <div class=\"robot\"></div>\n      </div>\n    </div>\n  ";
    var render = template.compile(source);
    var html = render(data);
    return html;
};
