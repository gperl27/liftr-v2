import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Dashboard extends Component {
  componentWillMount(){
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>Dashboard</div>
    );
  }
}

export default connect(null, actions)(Dashboard);
