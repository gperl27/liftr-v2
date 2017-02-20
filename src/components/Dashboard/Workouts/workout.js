import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Link } from 'react-router';
import ExerciseList from '../Exercises/exercise_list';


class Workout extends Component {
  componentWillMount(){
    this.props.fetchWorkout();
  }

  handleDeleteExercise(props, id){
    props.deleteExercise(id);
  }

  render() {
    if(!this.props.workout){
      return <div>...Loading</div>;
    }

    return (
      <div>
        <h1>Today's Date</h1>
        <ExerciseList
            props={this.props}
            handleDeleteExercise={this.handleDeleteExercise}
            exercises={this.props.workout.exercises}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workout: state.workout.workout };
}

export default connect(mapStateToProps, actions)(Workout);
