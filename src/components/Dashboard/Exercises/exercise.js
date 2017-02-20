import React from 'react';

const Exercise = ({exercise}) => {
  return (
      <tr>
        <td>{exercise.name}</td>
        <td>{exercise.sets}</td>
        <td>{exercise.reps}</td>
        <td>{exercise.weight}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    )
}

export default Exercise;
