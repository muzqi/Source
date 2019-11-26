module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: 'eslint-config-cmiot', // 调用 cmiot eslint 配置文件
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 禁用箭头函数必须使用圆括号
    'arrow-parens': 'off',
    // 禁用未定义
    'no-undef': 'off',
    'spaced-comment': 'off',
    'import/prefer-default-export': 'warn',

    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
};
