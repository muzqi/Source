;
var orderbarTmpl = function (data) {
    var source = "\n    <div class=\"tmpl-orderbar\">\n      <div class=\"title\">\n        <%= title %>\n      </div>\n\n      <div class=\"list\">\n        <% for (var i = 0; i < list.length; i ++) { %>\n          <div class=\"text\">\n            <%= list[i] %>\n          </div>\n        <% } %>\n      </div>\n    </div>\n  ";
    var render = template.compile(source);
    var html = render(data);
    return html;
};
