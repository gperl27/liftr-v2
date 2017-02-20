import React, { Component } from 'react';
import Exercise from "./exercise";

class ExerciseList extends Component {
  render(){
    const exercises = this.props.exercises.map(exercise => {
      return (
        <Exercise
          props={this.props.props}
          handleDeleteExercise={this.props.handleDeleteExercise}
          key={exercise.id}
          exercise={exercise}
          />
      )
    });
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {exercises}
        </tbody>
      </table>
    )
  }
}

export default ExerciseList;
