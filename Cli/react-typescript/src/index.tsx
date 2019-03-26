import store from '@/store';
import App from '@/containers/App';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// 组件中文化
import { LocaleProvider } from 'antd';
import ZH_CN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
  <LocaleProvider locale={ZH_CN}>
    <Provider {...store}>
      <App />
    </Provider>
  </LocaleProvider>,
  document.getElementById('root'),
);
