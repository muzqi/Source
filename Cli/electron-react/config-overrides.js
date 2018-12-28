const theme = require('./theme');

const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = function override(config, env) {
  // 生产环境输出路径使用相对路径
  if (env === 'production') {
    config.output.publicPath = './';
  }

  // antd 支持按需加载
  config = injectBabelPlugin([
    'import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
    config,
  );

  // 配置 antd 主题, 以及全局 less 颜色变量
  // 所有样式表:
  // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
  config = rewireLess.withLoaderOptions({
    modifyVars: theme,
    javascriptEnabled: true,
  })(config, env);

  // 支持装饰器语法
  config = injectBabelPlugin([
    '@babel/plugin-proposal-decorators', {
      legacy: true,
    }], config);

  // 配置别名
  config.resolve.alias = {
    '@': resolve('src'),
  }

  return config;
};
