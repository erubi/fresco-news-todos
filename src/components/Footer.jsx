import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class TableFooter extends Component {
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
      <div className="todos-table-footer">
        <div className="footer-controls">
          <div className="rows-label">Rows per page:</div>
          <DropDownMenu
            underlineStyle={{ display: 'none' }}
            iconStyle={{ fill: 'rgba(0, 0, 0, 0.54)', fontSize: '12px' }}
            labelStyle={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.54)' }}
            value={rows}
            onChange={this.handleSetRows}
            className="rows-dropdown"
          >
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={15} primaryText="15" />
            <MenuItem value={20} primaryText="20" />
            <MenuItem value={25} primaryText="25" />
            <MenuItem value={30} primaryText="30" />
          </DropDownMenu>

          <div className="page-label">
            {`
              ${totalNumTodos ? (i || 1) : 0}-${j > totalNumTodos ? visibleNumTodos + i : j}
              of ${totalNumTodos}
            `}
          </div>
          <i onClick={prevPage} className="material-icons">chevron_left</i>
          <i onClick={nextPage} className="material-icons">chevron_right</i>
        </div>
      </div>
    );
  }
}

TableFooter.propTypes = {
  rows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalNumTodos: PropTypes.number.isRequired,
  visibleNumTodos: PropTypes.number.isRequired,
  setRows: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default TableFooter;
