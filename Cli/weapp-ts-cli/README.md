推荐使用 vscode 编辑器开发。

[TOC]

## 项目结构

```bash
weapp-ts-cli
|--- components # [0]
|--- pages # [1]
|--- |--- home
|--- |--- |--- home.json
|--- |--- |--- home.less
|--- |--- |--- home.ts
|--- |--- |--- home.wxml
|--- typings # [2]
|--- |--- pages
|--- |--- wx
|--- utils # [3]
|--- app.ts # [4]
|--- app.json # [5]
|--- app.less # [6]
|--- .eslintrc.js # [7]
|--- prettier.config.js # [8]
|--- project.config.json # [9]
|--- sitemap.json # [10]
|--- tsconfig.json # [11]
```

- [0] `components` 公共组件以及 UI 组件存放在该文件夹中
- [1] `pages` 页面文件夹，小程序的所有页面都将存放在
  这里
  - `home` 某页面的文件夹，内部包含四个同名文件。需要注意的是：.less .ts 文件会在保存和编译时，在同级目录下生成 .wxss .js 文件，供小程序消费
- [2] `typings` 存放所有 typescript 类型、接口定义的文件夹
  - `pages` 与 pages 页面文件夹一一对应，方便查看
  - `wx` 小程序内部方法的类型、接口定义
- [3] `utils` 工具函数的存放地点
- [4] `app.ts` 小程序入口 ts，编译时会自动生成 app.js
- [5] `app.json` 全局配置文件
- [6] `app.less` 全局 less
- [7] `.eslintrc.js` eslint 配置文件
  - `parser: '@typescript-eslint/parser'` 由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 @typescript-eslint/parser，替代掉默认的解析器，别忘了同时安装 typescript；
  - `plugins: ['@typescript-eslint'],` 接下来需要安装对应的插件 @typescript-eslint/eslint-plugin 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。
- [8] `tsconfig.json` tslint 配置文件
- [9] `prettier.config.js` prettier 格式化工具配置文件
- [10] `project.config.json` 小程序的配置文件
- [11] `sitemap.json` 小程序 seo 配置文件

## VSCode 插件

### Document This

推荐使用。头部注释，多人协作中，建议每一个 js 都使用该插件，生成头部注释文件。该注释可以清楚看到文件由谁创建，文件的意义，创建时间以及更改时间，维护的时候不需要再四处打听代码由谁编写。

```javascript
/*
 * @Author: liqi1@cmiot.chinamobile.com
 * @Tel:  19823363089
 * @Date: 2019-11-21 22:55:11
 * @Description: 首页
 * @Last Modified by: liqi1@cmiot.chinamobile.com
 * @Last Modified time: 2019-11-26 14:04:14
 */
```

vscode 配置：

```javascript
"fileheader.Author": "liqi1@cmiot.chinamobile.com",
"fileheader.LastModifiedBy": "liqi1@cmiot.chinamobile.com",
"fileheader.tpl": "/*\r\n * @Author: {author} \r\n * @Tel: 19823363089 \r\n * @Date: {createTime} \r\n * @Description: \r\n * @Last Modified by: {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n */\r\n",
```

### Easy Less

必备。微信小程序无法识别 .less 文件，启动该插件，会在保存 less 的同时，在同级目录下编译生成 .wxss 文件。

vscode 配置：

```javascript
"less.compile": {
    "compress": true, // 是否删除多余空白字符
    "outExt": ".wxss" // 输出文件的后缀,默认为.css
}
```

### wxml

必备。让编辑器能够识别 .wxml 文件，当然你也可以通过设置文件关联 .html 来实现，但该插件还提供 .wxml 文件的 format 功能。

vscode 配置：

```javascript
"wxmlConfig.onSaveFormat": true,
"wxmlConfig.format": {
    "wrap_attributes_count": 2  // 标签属性超过两个时，format 换行处理
}
```

### ESLint

必备。本框架采用 Typescript，但我们使用 eslint 进行代码规范检查。

.eslintrc.js

```javascript
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

    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
};
```

vscode 配置：

```javascript

"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
"eslint.validate": [
    {
        "language": "typescript",
        "autoFix": true
    }
]
```

### TSLint

必备。使用 TSLint 对 TS 语法做校验。

tsconfig.json：

```javascript
{
    "compilerOptions": {
        "strictNullChecks": true,
        "noImplicitAny": true,
        "module": "CommonJS",
        "target": "ES5",
        "allowJs": false,
        "experimentalDecorators": true,
        "noImplicitThis": true,
        "noImplicitReturns": true,
        "alwaysStrict": true,
        "inlineSourceMap": true,
        "inlineSources": true,
        "noFallthroughCasesInSwitch": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "strict": true,
        "removeComments": true,
        "pretty": true,
        "strictPropertyInitialization": true,
        "lib": ["es5"],
        "typeRoots": ["./typings"]
    },
    "include": ["./**/*.ts"],
    "exclude": ["node_modules", "miniprogram_npm"]
}
```

- typeRoots 引用的 type 类型资源
- include 校验目录下所有 .ts 文件
- exclude 不校验 node_modules 和 miniprogram_npm

vscode 配置：

```javascript
"tslint.autoFixOnSave": true
```

### Prettier - Code formatter

必备。代码格式化工具

prettier.config.js：

```javascript
// 配置文档：https://jsweibo.github.io/2019/10/17/Prettier%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/

module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 4 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'es5',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf',
};
```
