import React, { Component } from 'react';
import Exercise from "./exercise";

class ExerciseList extends Component {
  render(){
    if(!this.props.exercises){
      return ( <div>Loading...</div>);
    }

    if(this.props.exercises.length === 0){
      return <div>No exercises yet today!</div>
    }


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
