import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers';
import { appActions } from '../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleSetRows = (e, k, v) => {
    this.props.setRows(v);
  }

  render() {
    const {
      rows,
      page,
      totalNumTodos,
      visibleNumTodos,
      prevPage,
      nextPage,
    } = this.props;
    const i = (rows * page);
    const j = i + rows;

    return (
      <div className="footer">
        <div className="footer__controls">
          <div className="footer__dropdown-label">Rows per page:</div>
          <DropDownMenu
            underlineStyle={{ display: 'none' }}
            iconStyle={{ fill: 'rgba(0, 0, 0, 0.54)', fontSize: '12px' }}
            labelStyle={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.54)' }}
            value={rows}
            onChange={this.handleSetRows}
            className="footer__dropdown"
          >
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={15} primaryText="15" />
            <MenuItem value={20} primaryText="20" />
            <MenuItem value={25} primaryText="25" />
            <MenuItem value={30} primaryText="30" />
          </DropDownMenu>

          <div className="footer__page-label">
            {`
              ${totalNumTodos ? (i || 1) : 0}-${j > totalNumTodos ? visibleNumTodos + i : j}
              of ${totalNumTodos}
            `}
          </div>
          <i onClick={prevPage} className="material-icons footer__icon">chevron_left</i>
          <i onClick={nextPage} className="material-icons footer__icon">chevron_right</i>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  rows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalNumTodos: PropTypes.number.isRequired,
  visibleNumTodos: PropTypes.number.isRequired,
  setRows: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    rows: state.getIn(['app', 'rows']),
    page: state.getIn(['app', 'page']),
    totalNumTodos: state.get('todos').size,
    visibleNumTodos: getVisibleTodos(state).size,
  };
}

export default connect(mapStateToProps, {
  setRows: appActions.setRows,
  prevPage: appActions.prevPage,
  nextPage: appActions.nextPage,
})(Footer);

