// roobo生产环境 'https://storybox-api.roobo.com/rtoy',
// roobo测试环境 'http://storybox.roobo.net',
// roobo开发环境 'http://api.storybox-dev.svc.roobo.net/robot',

// 杭研生产 'https://open.home.komect.com'





// 现网环境代理地址
var rooboProxyhost = 'https://net.and-home.cn/roobo'
// 本地代理地址
// var rooboProxyhost = 'http://localhost/roobo';

var ROOBO_CONFIG = {
  baseUrl: rooboProxyhost + '/rtoy', // 生产环境
  // baseUrl: rooboProxyhost, // 测试环境
  // baseUrl: rooboProxyhost + '/robot', // 开发环境
  api: {
    regist: '/users/regist',
    login: '/users/login',
    authcode: '/users/authcode',
    report: '/mainctrls/report',
    mcbind: '/mainctrls/mcbind',
  }
}


// 现网环境代理地址
var hemuProxyhost = 'https://net.and-home.cn/hemu/app_h5/api';
// 本地代理地址
// var hemuProxyhost = 'http://localhost/hemu/app_h5/api';

var HEMU_CONFIG = {
  baseUrl: hemuProxyhost,
}
