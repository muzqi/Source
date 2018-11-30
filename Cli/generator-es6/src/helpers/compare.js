
/**
 *  用于比较的handlebars helper
 *  @param    {*}  lValue  左值
 *  @param    {string} operator 比较符
 *  @param    {*}  rValue  右值
 *  @param    {Object}  options 上下文
 *  @return   {string}  编译执行后的文本
 */
export default function compare(lValue, operator, rValue, options) {
  if (arguments.length < 4) {
    throw new Error('Handlerbars Helper "compare" needs 3 parameters')
  }

  const operators = {
    '==': function(l, r) {
      return l == r
    },
    '===': function(l, r) {
      return l === r
    },
    '!=': function(l, r) {
      return l != r
    },
    '<': function(l, r) {
      return l < r
    },
    '>': function(l, r) {
      return l > r
    },
    '<=': function(l, r) {
      return l <= r
    },
    '>=': function(l, r) {
      return l >= r
    },
    'typeof': function(l, r) {
      return typeof l == r
    }
  }

  if (!operators[operator]) {
    throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator)
  }

  const result = operators[operator](lValue, rValue)

  if (result) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}