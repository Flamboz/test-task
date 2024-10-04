import React from 'react';
import ReactDOM from 'react-dom';
import { ExampleApp } from './ExampleApp';
import '../styles/index.less';
import '../styles/carbon.less';
import '../styles/example.less';

const APP_ELEMENT = document.getElementById('app')!;
const render = (Component: React.ComponentClass<any>) => {
  ReactDOM.render(<Component />, APP_ELEMENT);
};

render(ExampleApp);
