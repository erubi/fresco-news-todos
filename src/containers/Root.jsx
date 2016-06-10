import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import TodoListContainer from './TodoListContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../stylesheets/index.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="app-ctr">
        <TodoListContainer />
      </div>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;

