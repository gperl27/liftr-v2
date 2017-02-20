import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Link } from 'react-router';
import ExerciseList from '../Exercises/exercise_list';


class Workout extends Component {
  componentWillMount(){
    this.props.fetchWorkout();
  }


  // renderWorkout(){
  //   console.log(this.props.workout.exercises);
  // }

  render() {
    if(!this.props.workout){
      return <div>...Loading</div>;
    }

    return (
      <div>
        <h1>Today's Date</h1>
        <ExerciseList exercises={this.props.workout.exercises} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workout: state.workout.workout };
}

export default connect(mapStateToProps, actions)(Workout);
