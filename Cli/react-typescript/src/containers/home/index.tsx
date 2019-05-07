import './index.less';
import logo from '@/assets/logo.svg';

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';

type Props = Readonly<{
  usr: {
    usrname: string;
  };
}>;

@inject('usr')
@observer
class Home extends Component<Props> {
  // public static defaultProps: Partial<Props> = {
  //   usr: {
  //     usrname: 'default',
  //   },
  // };

  public render() {
    const { usr: { usrname } } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button>{usrname}</Button>
        </header>
      </div>
    );
  }
}

export default Home;
