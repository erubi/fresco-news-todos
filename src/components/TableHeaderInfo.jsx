import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class TableHeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { title } = this.props;

    return (
      <div className="table-header-info">
        <span className="title">{title}</span>
      </div>
    );
  }
}

TableHeaderInfo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TableHeaderInfo;
