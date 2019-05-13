var cookie = (function () {
  /**
   * 根据name读取cookie
   * @param  {String} name name
   * @return {String} 返回具体 cookie
   */
  function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, '').split(';');
    for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split('=');
      if (tempArr[0] == name) {
        return decodeURIComponent(tempArr[1]);
      }
    }
    return '';
  }

  /**
   * 设置Cookie
   * @param {String} name   name
   * @param {String} value  value
   * @param {Number} days   有效期,天
   */
  function setCookie(name, value, days) {
    var days = days || 7;
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
  }

  return {
    getCookie,
    setCookie,
  }
}());

var tools = (function () {
  /**
   * 切换表单的 error 状态
   * @param {String}  id      表单 id
   * @param {Boolean} boolean 显示还是隐藏
   * @param {String}  msg     提示信息
   */
  function toggleErrorTip(id, boolean, msg) {
    var msg = msg || '';
    var el = $('#' + id);
    if (boolean) {
      el.addClass('error');
      el.find('.error-tip').text(msg);
    } else {
      el.removeClass('error');
      el.find('.error-tip').text(msg);
    }
  }

  /**
   * 切换按钮的 disable 状态
   * @param {String}  id      id
   * @param {Boolean} boolean boolean
   */
  function toggleBtnDisable(boolean) {
    if (boolean) {
      $('.btn-primary').addClass('disable');
    } else {
      $('.btn-primary').removeClass('disable');
    }
  }

  function addTogglePdVisibleEvent(id) {
    $('#' + id).on('click', function () {
      var input = $(this).siblings('.input').eq(0).find('input');
      var currType = input.attr('type');

      var eye = '../images/common_eye.png';
      var noeye = '../images/common_noeye.png';

      input.attr('type', currType === 'password' ? 'text' : 'password');
      $(this).attr('src', currType === 'password' ? noeye : eye);
    })
  }

  function verifyPhone(str) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|198)[0-9]{8}$/;

    if (str.match(reg)) {
      return true;
    }
    return false;
  }

  function verifyCode(str) {
    var reg = /^\d{4,6}$/;

    if (str.match(reg)) {
      return true;
    }
    return false;
  }

  function verifyPassword(str) {
    var reg = /^[\w+!+@+#+$+%+^+&+*]{6,20}$/;

    if (str.match(reg)) {
      return true;
    }
    return false;
  }

  function bindAlertEvent(ele) {
    $(ele).on('click', function () {
      weui.dialog({
        title: '提示',
        content: '公众号已复制, 点击 「确定」到微信中关注 "物联小智" 公众号, 获取下载地址 <span style="color: #25dfcc;">(请用同一个手机号注册或登录)</span>',
        className: 'custom-alert',
        buttons: [
          {
            label: '取消',
            type: 'default',
          },
          {
            label: '确定',
            type: 'primary',
            onClick: function () {
              weui.topTips('已将"物联小智"粘贴到剪切板', {
                className: 'success-top-tips',
              });
            },
          },
        ],
      });

      new ClipboardJS('.custom-alert .weui-dialog__btn_primary', {
        text: function () {
          return '物联小智';
        }
      });

    });
  }

  return {
    toggleErrorTip,
    toggleBtnDisable,
    addTogglePdVisibleEvent,
    verifyPhone,
    verifyCode,
    verifyPassword,
    bindAlertEvent,
  }
}());

var oldAjax = (function () {
  /**
   * 发送验证码请求
   * @param {String} phoneNumber 电话号码
   * @param {Func}   successCb   成功回调
   * @param {Func}   errorCb     失败回调
   */
  function sendCode(phoneNumber, successCb, errorCb) {
    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.authcode,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'newcode',
        'data': {
          'app_package_id': 'he.h5-fix',
          'appid': 'he.h5-fix',
          'phonenum': phoneNumber,
          'usage': 'regist-phone',
        },
      }),
      success(res) {
        console.log(res)
        successCb(res)
      },
      error() {
        errorCb()
        weui.topTips('获取验证码失败!')
      },
    });
  }

  /**
   * 发起注册请求
   * @param {String} phoneNumber 电话号码
   * @param {String} code        验证码
   * @param {String} password    密码
   * @param {String} callback    成功的回调函数
   */
  function regist(phoneNumber, code, password, callback) {
    var loading = weui.loading('loading')

    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.regist,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'quickregist',
        'data': {
          'pcode': '+86',
          'lang': 'zh',
          'app_package_id': 'he.h5-fix',
          'appid': 'he.h5-fix',
          'phonenum': phoneNumber,
          'validcode': code,
          'passwd': md5('geG^_s[3Kl' + password),
          'pushsvr': 'baidu',
          'pushid': '1234',
          'name': 'hejia_' + new Date().valueOf(),
          'tm': '123',
          'app': {
            'app': 'com.roo.bo.pudding_IOS',
            'aver': '1.1.1',
            'via': 'ios',
            'cver': '2'
          },
        },
      }),
      success(res) {
        console.log(res)
        loading.hide()
        callback(res)
      },
      error() {
        loading.hide()
        weui.topTips('注册失败!')
      }
    })
  }

  /**
   * 发起登录请求
   * @param {String} phoneNumber 电话号码
   * @param {String} password    密码
   * @param {Func}   callback    回调函数
   */
  function login(phoneNumber, password, callback) {
    // 开启 loading
    var loading = weui.loading('loading')

    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.login,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'login',
        'data': {
          'app_package_id': 'he.h5-fix',
          'appid': 'he.h5-fix',
          'pcode': '+86',
          'lang': 'zh',
          'phonenum': phoneNumber,
          'passwd': md5('geG^_s[3Kl' + password),
          'pushid': '',
          'wifimac': '',
          'tm': String(new Date().valueOf()),
          'app': {
            'app': 'com.roo.bo.pudding_IOS',
            'aver': '1.1.1',
            'via': 'ios',
            'cver': '2'
          },
        },
      }),
      success(res) {
        console.log(res)
        loading.hide()
        callback(res)
      },
      error() {
        loading.hide()
        weui.topTips('登录失败!')
      }
    })
  }

  /**
   *
   * @param {String} userid     用户 id
   * @param {String} token      token
   * @param {String} reqmainctl 需要申请绑定的设备 SN
   * @param {Func}   callback   绑定成功回调
   */
  function mcbind(userid, token, reqmainctl, callback) {
    // 开启 loading
    var loading = weui.loading('loading')

    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.mcbind,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'reqbind',
        'data': {
          'app_package_id': 'he.h5-fix',
          'appid': 'he.h5-fix',
          'myid': userid,
          'token': token,
          'reqmainctl': reqmainctl,
          'ps': '',
        },
      }),
      success(res) {
        console.log(res);
        loading.hide();
        callback(res);
      },
      error() {
        loading.hide();
        weui.topTips('绑定失败!');
      },
    });
  }

  return {
    sendCode,
    regist,
    login,
    mcbind,
  }
}());

var ajax = (function () {
  /**
   * 请求和目 token
   * @param {Object} params   参数
   * props:
   * @param {String} phone    手机号
   * @param {Func}   success  成功回调
   * @param {Func}   error    失败回调
   * @param {Func}   complete 完成回调
   */
  function fetchAndmuToken(params) {
    params = params || {};

    params.success = params.success || function () { };
    params.error = params.error || function () { };
    params.complete = params.complete || function () { };

    $.ajax({
      type: 'POST',
      url: HEMU_CONFIG.baseUrl + '/digitalFamily',
      contentType: 'application/json',
      data: JSON.stringify({
        serviceName: 'dhap.dms.createTokenByPhone',
        methodName: 'invoke',
        parameters: {
          phone: params.phone || '',
        },
      }),
      success(res) {
        if (res.resultCode === '000000') {
          params.success(res.data.andMuToken);
        } else {
          params.error(res.resultMsg);
        }
      },
      error(err) {
        params.error(err);
      },
      complete() {
        params.complete();
      },
    });
  };

  /**
   * 发起登录请求
   * @param {Object} params      参数
   * props:
   * @param {String} phone       电话号码
   * @param {String} token       密码
   * @param {Func}   success     成功回调
   * @param {Func}   error       失败回调
   * @param {Func}   complete    完成回调
   */
  function fetchLogin(params) {
    params = params || {};
    params.success = params.success || function () { };
    params.error = params.error || function () { };
    params.complete = params.complete || function () { };

    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.login,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'login',
        'data': {
          'app_package_id': 'he.h5',
          'appid': 'he.h5',
          'pcode': '+86',
          'lang': 'zh',
          'phonenum': params.phone || '',
          'thirdCode': params.token || '',
          'passwd': '',
          'pushid': '',
          'wifimac': '',
          'tm': String(new Date().valueOf()),
          'app': {
            'app': 'andmu.a21',
            'aver': '1.1.1',
            'via': 'ios',
            'cver': '2'
          },
        },
      }),
      success(res) {
        if (res.result === 0) {
          params.success(res.data);
        } else {
          params.error(res.msg);
        }
      },
      error() {
        params.error(res);
      },
      complete() {
        params.complete();
      },
    })
  }

  /**
   * 上报接口
   * 联调时使用, 线上机器会自动调用
   * @param {Object} params params
   */
  function fetchReport(params) {
    params = params || {};
    params.success = params.success || function () { };
    params.error = params.error || function () { };
    params.complete = params.complete || function () { };

    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.report,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'MasterInit/confNetTime',
        'data': {
          'app_package_id': 'he.h5',
          'appid': 'he.h5',
          'mainctl': params.sn || '',
          'token': params.deviceToken || '',
          'result': 'success',
        },
      }),
      success(res) {
        if (res.result === 0) {
          params.success(res);
        } else {
          params.error(res.msg);
        }
      },
      error(err) {
        params.error(err);
      },
      complete() {
        params.complete();
      },
    });
  }

  /**
   * 发起绑定请求
   * @param {Object} params     参数
   * @param {String} userid     用户 id
   * @param {String} token      token
   * @param {String} sn         需要申请绑定的设备 SN
   * @param {Func}   success    成功回调
   * @param {Func}   error      失败回调
   * @param {Func}   complete   完成回调
   */
  function fetchBind(params) {
    params = params || {};
    params.success = params.success || function () { };
    params.error = params.error || function () { };
    params.complete = params.complete || function () { };

    $.ajax({
      type: 'POST',
      url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.mcbind,
      contentType: 'application/json',
      data: JSON.stringify({
        'action': 'reqbind',
        'data': {
          'app_package_id': 'he.h5',
          'appid': 'he.h5',
          'myid': params.userid || '',
          'token': params.token || '',
          'reqmainctl': params.sn || '',
          'ps': '',
        },
      }),
      success(res) {
        if (res.result === 0) {
          params.success(res);
        } else if (res.result === -314 || res.result === -315 || res.result === -316 || res.result === -416) {
          console.log(res.msg);
        } else {
          params.error(res.msg);
        }
      },
      error(err) {
        params.error(err);
      },
      complete() {
        params.complete();
      },
    });
  };

  return {
    fetchAndmuToken,
    fetchLogin,
    fetchReport,
    fetchBind,
  }
}());

var brower = (function () {
  function versions() {
    var u = window.navigator.userAgent;
    var num;
    if (u.indexOf('Mobile') > -1) {
      //CuPlayer.com提示：移动端
      if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //ios
        if (u.indexOf('iPhone') > -1) {
          //iphone
          return { type: 'iPhone' };
        } else if (u.indexOf('iPod') > -1) {
          //ipod
          return { type: 'iPod' };
        } else if (u.indexOf('iPad') > -1) {
          //ipad
          return { type: 'iPad' };
        }
      } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //android
        num = u.substr(u.indexOf('Android') + 8, 1);
        return { type: 'Android', version: num };
      } else if (u.indexOf('BB10') > -1) {
        //CuPlayer.com提示：黑莓bb10系统
        return { type: 'BB10' };
      } else if (u.indexOf('IEMobile')) {
        //windows phone
        return { type: 'Windows Phone' };
      }
    }
  }

  return {
    versions,
  }
}());

var bind = {
  // Android 7.0.0 以下
  underAndroid7: function () {
    Hejia.ready(function () {
      Hejia.getDeviceInfo(function (obj) {
        var loading = weui.loading('加载中');
        var isOnline = obj.device.connected;

        // 将设备 sn 存在 cookie 中
        cookie.setCookie('device_sn', obj.device.id.split('-')[2]);
        var usertoken = cookie.getCookie('hejia_token');
        var userid = cookie.getCookie('hejia_userid');

        if (!usertoken) {
          loading.hide();
          window.location.href = './login.html';
          return;
        }

        // 切换设备连接状态
        if (isOnline) {
          $('#outline').addClass('hide');
          $('#online').removeClass('hide');
        } else {
          $('#outline').removeClass('hide');
          $('#online').addClass('hide');
          // 设备离线状态, 则不会发起绑定请求
          loading.hide();
          return;
        }

        $.ajax({
          type: 'POST',
          url: ROOBO_CONFIG.baseUrl + ROOBO_CONFIG.api.mcbind,
          contentType: 'application/json',
          data: JSON.stringify({
            'action': 'reqbind',
            'data': {
              'app_package_id': 'he.h5-fix',
              'appid': 'he.h5-fix',
              'myid': userid,
              'token': usertoken,
              // 垃圾平台, 拿个变量要 tm 这么拿才不会全局阻塞, cnmd
              'reqmainctl': JSON.parse(JSON.stringify(obj)).device.id.split('-')[2],
              'ps': '',
            },
          }),
          success(res) {
            loading.hide();
            // 0    绑定成功
            // -314 该用户已绑定
            // -316 已有其他用户绑定
            // 只有当状态码不等于以上三类, 才会重定向到登录界面
            var resultCode = Number(res.result);
            switch (resultCode) {
              case -314:
                break;
              case -316:
                break;
              case 0:
                break;
              default:
                window.location.href = './login.html';
                break;
            }
          },
          error() {
            loading.hide();
            weui.topTips('绑定失败!');
          },
        });
      });
    });
  },

  // Android 7.0.0 以上
  aboveAndroid7: function () {
    var loading = weui.loading('加载中');
    Hejia.ready(function () {

      // 获取设备信息
      Hejia.getDeviceInfo(function (obj) {
        var sn = obj.device.id;
        var isOnline = obj.device.connected;

        // 切换设备连接状态
        if (isOnline) {
          $('#outline').addClass('hide');
          $('#online').removeClass('hide');
        } else {
          $('#outline').removeClass('hide');
          $('#online').addClass('hide');
          // 设备离线状态, 则不会发起绑定请求
          loading.hide();
          return;
        }

        // ---------- getPhoneNumber START
        Hejia.getPhoneNumber(function (mobile) {
          alert(mobile);
          // ---------- fetchAndmuToken START
          ajax.fetchAndmuToken({
            phone: mobile,
            success: function (token) {

              // ---------- fetchLogin START
              ajax.fetchLogin({
                phone: mobile,
                token: token,
                success(data) {
                  var userid = data.userid;
                  var token = data.token;

                  // ---------- fetchBind START
                  ajax.fetchBind({
                    userid: userid,
                    token: token,
                    sn: sn.split('-')[2],
                    success(data) {
                      weui.topTips('绑定成功', {
                        className: 'success-top-tips',
                      });
                    },
                    error(err) {
                      weui.topTips('服务器内部错误！');
                    },
                    complete() {
                      loading.hide();
                    },
                  });
                  // ---------- fetchBind END

                },
                error(err) {
                  weui.topTips('服务器内部错误！');
                  loading.hide();
                },
              });
              // ---------- fetchLogin END

            },
            error: function (err) {
              weui.topTips('服务器内部错误！');
              loading.hide();
            },
          });
          // ---------- fetchAndmuToken END

        });
        // ---------- getPhoneNumber END
      });
    });
  },
};
