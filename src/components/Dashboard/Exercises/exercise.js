import React from 'react';

const Exercise = (props) => {
  return (
      <tr>
        <td>{props.exercise.name}</td>
        <td>{props.exercise.sets}</td>
        <td>{props.exercise.reps}</td>
        <td>{props.exercise.weight}</td>
        <td>Edit</td>
        <td onClick={props.handleDeleteExercise.bind(null, props.props, props.exercise.id)}>Delete</td>
      </tr>
    )
}

export default Exercise;
