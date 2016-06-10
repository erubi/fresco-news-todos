import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// import './stylesheets/index.scss';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('app')
);

