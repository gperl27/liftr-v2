import React, { Component } from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <ul className="list-group">
            <li className="list-group-item"><Link className="nav-link" to="/dashboard/today">Today</Link></li>
            <li className="list-group-item"><Link className="nav-link" to="/lastWeekToday">Last Week Today</Link></li>
          </ul>
        </div>
        <div className="col-md-10">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dashboard;
