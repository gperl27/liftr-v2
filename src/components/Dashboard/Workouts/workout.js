import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Link } from 'react-router';
import ExerciseList from '../Exercises/exercise_list';
import AddExercise from '../Exercises/add_exercise';
import WorkoutName from './workout_name';
import Time from 'react-time'

//add to date prototype to play nice with api
//source: http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};

class Workout extends Component {
  constructor(props){
    super(props);

    this.state = { adding: false, day: props.day }
  }

  componentWillMount(){
    const date = new Date(this.state.day).yyyymmdd();
    // console.log(this.props.day);

    this.props.fetchWorkout({date});
  }

  handleDeleteExercise(props, id){
    props.deleteExercise(id);
  }

  handleAddExercise(){
    this.setState({ adding: !this.state.adding});
  }

  render() {

    if(!this.props.workout){
      return <div>...Loading</div>;
    }

    let now = new Date();
    let workoutDate = now.yyyymmdd();

    return (
      <div>
        <div className="col-md-6">
          <WorkoutName updateName={this.props.updateWorkoutName} name={this.props.workout.name} id={this.props.workout.id} />
          <ExerciseList
            props={this.props}
            handleDeleteExercise={this.handleDeleteExercise}
            exercises={this.props.workout.exercises}
            />
        </div>
        <div className="col-md-4">
          <button onClick={this.handleAddExercise.bind(this)}>{this.state.adding ? 'Cancel' : 'New Exercise'}</button>
          {this.state.adding ? <AddExercise date={workoutDate} handleAddExercise={this.handleAddExercise.bind(this)} /> : null }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workout: state.workout.workout, date: state.workout.date };
}

export default connect(mapStateToProps, actions)(Workout);
