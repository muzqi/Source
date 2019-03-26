const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const theme = require('./theme');

module.exports = override(
  // antd 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // less-loader 配置自定义主题色
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  }),
  // 设置别名映射
  addWebpackAlias({
    ['@']: path.resolve(__dirname, "src"),
  }),
  // 支持装饰器语法
  addDecoratorsLegacy(),
);
