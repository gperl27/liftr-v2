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
    console.log(this.state);
    console.log(this.props.name);

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
      <div>
        { !this.state.active ? <h3>{this.props.name}</h3> :
        <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} /> }
          <span onClick={this.handleToggleEdit.bind(this)}>{ !this.state.active ? 'Edit' : 'Save' }</span>
      </div>
    )
  }
}

export default WorkoutName;
