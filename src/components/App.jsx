import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { appActions } from '../actions';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Body from './Body';

class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    if (window.matchMedia) {
      const mq = window.matchMedia('(max-width: 500px)');
      mq.addListener(() => this.onWidthChange(mq));
      this.onWidthChange(mq);
    }
  }

  onWidthChange(mq) {
    const { setMobile } = this.props;
    if (mq.matches) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  render() {
    const {
      mobile,
    } = this.props;

    if (mobile) {
      return (
        <div>
          <Nav title={'title'} />
          <div className="todos-table-ctr">
            <Header />
            <Body />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Nav title={'title'} />
        <div className="todos-table-ctr">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.getIn(['app', 'mobile']),
  };
}

App.propTypes = {
  mobile: PropTypes.bool.isRequired,
  setMobile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setMobile: appActions.setMobile,
})(App);

