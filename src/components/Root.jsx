import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../stylesheets/index.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#0047bb',
  },
});

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="app-ctr">
        <App />
      </div>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;

