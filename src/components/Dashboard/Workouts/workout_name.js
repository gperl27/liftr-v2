import React, { Component } from 'react';

class WorkoutName extends Component {
  constructor(props){
    super(props);

    this.state = {
      active: false,
      name: props.name
    }
  }

  handleToggleEdit(){
    if(this.state.active){
      const name = this.state.name;
      const id = this.props.id;
      this.props.updateName({id, name});
    } else {
      const name = this.props.name;
      this.setState({name});
    }

    this.setState({ active: !this.state.active});
  }

  handleNameChange(e){
    const name = e.target.value;
    this.setState({ name });
  }

  render(){
    return (
      <div className="workoutHeader">
        { !this.state.active ? <h3 className="workoutHeader">{this.props.name}</h3> :
        <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        }
        <span className="btn btn-warning" onClick={this.handleToggleEdit.bind(this)}>{ !this.state.active ? 'Change Name' : 'Save' }</span>
      </div>
    )
  }
}

export default WorkoutName;
