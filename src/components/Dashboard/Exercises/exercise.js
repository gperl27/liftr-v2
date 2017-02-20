import React, { Component } from 'react';

class Exercise extends Component {
  constructor(props){
    super(props);

    this.state = {
      active: false,
      data: {
        name: props.exercise.name,
        sets: props.exercise.sets,
        reps: props.exercise.reps,
        weight: props.exercise.weight
      }
    }
  }

  handleToggleEdit(){
    if(this.state.active){
      let name = this.refs.name.value;
      let sets = this.refs.sets.value;
      let reps = this.refs.reps.value;
      let weight = this.refs.weight.value;

      // send data to api
    }

    this.setState({ active: !this.state.active});
  }

  handleChange(property, e){
    const val = this.state.data;
    val[property] = e.target.value;
    this.setState({ val });
  }

  render(){
    return (
      <tr>
        <td>{ !this.state.active ? <div>{this.state.data.name}</div> :
                                   <input ref="name"
                                          placeholder="please work"
                                          type="text" value={this.state.data.name}
                                          onChange={this.handleChange.bind(this, 'name')}
                                     />
             }
        </td>
        <td>{ !this.state.active ? <div>{this.state.data.sets}</div> :
                                   <input ref="sets"
                                          placeholder="please work"
                                          type="number"
                                          value={this.state.data.sets}
                                          onChange={this.handleChange.bind(this, 'sets')} />}
        </td>
        <td>{ !this.state.active ? <div>{this.state.data.reps}</div> :
                                   <input ref="reps"
                                          placeholder="please work"
                                          type="number" value={this.state.data.reps}
                                          onChange={this.handleChange.bind(this, 'reps')} />}
        </td>
        <td>{ !this.state.active ? <div>{this.state.data.weight}</div> :
                                   <input ref="weight"
                                          placeholder="please work"
                                          type="number"
                                          value={this.state.data.weight}
                                          onChange={this.handleChange.bind(this, 'weight')} />}
        </td>
        <td onClick={this.handleToggleEdit.bind(this)}>{!this.state.active ? 'Edit' : 'Save'}</td>
        <td onClick={this.props.handleDeleteExercise.bind(null, this.props.props, this.props.exercise.id)}>Delete</td>
      </tr>
    )
  }
}

export default Exercise;
