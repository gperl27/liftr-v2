import React, { Component } from 'react';

class ChooseExercise extends Component {
  handleSelectExercise(e){
    const name = e.target.value;

    if(name !== "default"){
      this.props.fetchExercise({name});
    }
  }

  render() {
    if(!this.props.exercises){
      return <div>Loading...</div>;
    }

    const exerciseNames = this.props.exercises.map(e => {
      return <option key={e.id} value={e.name}>{e.name}</option>
    });

    return (
      <select className="form-control" onChange={this.handleSelectExercise.bind(this)}>
       <option value="default">Choose</option>
       {exerciseNames}
      </select>
    );
  }
}
export default ChooseExercise;
