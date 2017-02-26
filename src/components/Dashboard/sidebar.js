import React, { Component } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
// save nav where left off if user reloads the page
let nav = localStorage.getItem('nav');
if(!nav){
  nav = '';
}

export default class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = { selected : nav };
  }

  handleNavClick(e){
    const value = e.target.getAttribute('value');
    this.setState({selected: value});
    localStorage.setItem('nav', value);
  }

  forgetNav(){
    localStorage.removeItem('nav');
  }

  render() {
    return (
      <div className="sidebar">
        <h1><Link className="nav-link" to="/">Liftr</Link></h1>
        <ul className="list-group">
          <li className={this.state.selected === '0' ? 'selected list-group-item' : 'list-group-item' }>
            <FontAwesome className="icons" name='star'  />
            <Link onClick={this.handleNavClick.bind(this)} value={0} className='nav-link' to="/dashboard/today">
              Today
            </Link>
          </li>
          <li className={this.state.selected === '1' ? 'selected list-group-item' : 'list-group-item' }>
            <FontAwesome className="icons" name='calendar'  />
            <Link onClick={this.handleNavClick.bind(this)} value={1} className='nav-link'  to="/dashboard/calendar">Calendar</Link>
          </li>
          <li className="list-group-item">
            <Link onClick={this.forgetNav.bind(this)} className="nav-link" to="/signout">Sign Out</Link>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = Sidebar;
