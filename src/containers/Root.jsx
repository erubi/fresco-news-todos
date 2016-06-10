import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import ListContainer from './ListContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <ListContainer />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;

