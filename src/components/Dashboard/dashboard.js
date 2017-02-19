import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Dashboard extends Component {
  componentWillMount(){
    this.props.fetchWorkouts();
  }

  renderWorkouts(){
    // console.log(this.props.workouts);
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderWorkouts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workouts: state.workouts };
}

export default connect(mapStateToProps, actions)(Dashboard);
