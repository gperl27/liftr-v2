import React, { Component } from 'react';
import Sidebar from './sidebar';


class Dashboard extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="content">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dashboard;
