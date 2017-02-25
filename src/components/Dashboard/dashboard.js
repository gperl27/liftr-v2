
import React, { Component } from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = { selected : 0 }
  }

  handleNavClick(e){
    const value = e.currentTarget.value;
    this.setState({selected: value});
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <ul className="list-group">
            <li onClick={this.handleNavClick.bind(this)} value={0} className={ this.state.selected === 0 ? 'list-group-item selected' : "list-group-item" }>
              <Link className="nav-link" to="/dashboard/today">Today</Link>
            </li>
            <li onClick={this.handleNavClick.bind(this)} value={1} className={ this.state.selected === 1 ? 'list-group-item selected' : "list-group-item" }>
              <Link className="nav-link" to="/dashboard/calendar">Calendar</Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to="/signout">Sign Out</Link>
            </li>
          </ul>
        </div>
        <div className="content">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dashboard;
