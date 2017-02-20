import React from 'react';
import Exercise from "./exercise";

const ExerciseList = (props) => {
  const exercises = props.exercises.map(exercise => {
    return (
        <Exercise
          props={props.props}
          handleDeleteExercise={props.handleDeleteExercise}
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

export default ExerciseList;
