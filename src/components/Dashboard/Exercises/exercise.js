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

  handleToggleEdit(id){
    if(this.state.active){
      let name = this.refs.name.value;
      let sets = this.refs.sets.value;
      let reps = this.refs.reps.value;
      let weight = this.refs.weight.value;

      // send data to api
      this.props.props.updateExercise({id, name, sets, reps, weight});
    }

    this.setState({ active: !this.state.active});
  }

  handleChange(property, e){
    const val = this.state.data;
    val[property] = e.target.value;
    this.setState({ val });
  }

  render(){
    const styles = {
      numberStyle : {
        'width' : '50px'
      },
      textStyle : {
        'width' : '250px'
      },
      editStyle : {
        'color' : '#8C489F',
        'cursor' : 'pointer'
      },
      deleteStyle : {
        'color' : 'red',
        'cursor' : 'pointer'
      }
    }

    return (
      <tr>
        <td>{ !this.state.active ? <div>{this.state.data.name}</div> :
                                   <input style={styles.textStyle}
                                          ref="name"
                                          placeholder="Exercise name"
                                          type="text" value={this.state.data.name}
                                          onChange={this.handleChange.bind(this, 'name')}
                                     />
             }
        </td>
        <td>{ !this.state.active ? <div>{this.state.data.sets}</div> :
                                   <input style={styles.numberStyle}
                                          ref="sets"
                                          placeholder="3"
                                          type="number"
                                          value={this.state.data.sets}
                                          onChange={this.handleChange.bind(this, 'sets')} />}
        </td>
        <td>{ !this.state.active ? <div>{this.state.data.reps}</div> :
                                   <input style={styles.numberStyle}
                                          ref="reps"
                                          placeholder="10"
                                          type="number" value={this.state.data.reps}
                                          onChange={this.handleChange.bind(this, 'reps')} />}
        </td>
        <td>{ !this.state.active ? <div>{this.state.data.weight}</div> :
                                   <input style={styles.numberStyle}
                                          ref="weight"
                                          placeholder="150"
                                          type="number"
                                          value={this.state.data.weight}
                                          onChange={this.handleChange.bind(this, 'weight')} />}
        </td>
        <td style={styles.editStyle} onClick={this.handleToggleEdit.bind(this, this.props.exercise.id)}>{!this.state.active ? 'Edit' : 'Save'}</td>
        <td style={styles.deleteStyle} onClick={this.props.handleDeleteExercise.bind(null, this.props.props, this.props.exercise.id)}>Delete</td>
      </tr>
    )
  }
}

export default Exercise;
