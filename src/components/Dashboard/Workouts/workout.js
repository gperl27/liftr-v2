import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Link } from 'react-router';
import ExerciseList from '../Exercises/exercise_list';
import AddExercise from '../Exercises/add_exercise';
import AddWorkout from './add_workout';
import WorkoutName from './workout_name';
import Time from 'react-time';
import moment from 'moment';

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

    this.state = { adding: false }
  }

  componentWillMount(){
    const date = moment(this.props.day).format('YYYY-MM-DD');
    this.props.fetchWorkout({date});
  }

  handleDeleteWorkout(){
    const workoutId = this.props.workout.id;
    // const date = this.props.workout.day;
    this.props.deleteWorkout({workoutId});
  }

  handleDeleteExercise(props, id){
    props.deleteExercise(id);
  }

  handleAddExercise(){
    this.setState({ adding: !this.state.adding});
  }

  render() {

    // wait for data to come in before trying to render component
    if(!this.props.workout){
      return <div>...Loading</div>;
    }

    // Prompt user to add new workout if there is none for that day
    if(!Object.keys(this.props.workout).length > 0){
      return (
        <AddWorkout day={this.props.day} addWorkout={this.props.addWorkout} />
      )
    }

    return (
      <div>
        <div className="col-md-6">
          <WorkoutName
            updateName={this.props.updateWorkoutName}
            refreshWorkout={this.props.fetchWorkout}
            id={this.props.workout.id}
            name={this.props.workout.name}
            day={this.props.day}
            />
          <ExerciseList
            props={this.props}
            handleDeleteExercise={this.handleDeleteExercise}
            exercises={this.props.workout.exercises}
            />
        </div>
        <div className="col-md-4">
          <button onClick={this.handleAddExercise.bind(this)}>{this.state.adding ? 'Cancel' : 'New Exercise'}</button>
          {this.state.adding ? <AddExercise date={this.props.day} handleAddExercise={this.handleAddExercise.bind(this)} /> : null }
          <button onClick={this.handleDeleteWorkout.bind(this)}>X Delete</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workout: state.workout.workout };
}

export default connect(mapStateToProps, actions)(Workout);
