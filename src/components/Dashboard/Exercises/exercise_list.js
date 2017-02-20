import React from 'react';
import Exercise from "./exercise";

const ExerciseList = (props) => {
  console.log(props);
  const exercises = props.exercises.map(exercise => {
    return (
        <Exercise
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
