import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from  '../../../actions';

class AddWorkout extends Component {
  constructor(props){
    super(props);

    this.state = { active: false };
  }

  handleFormSubmit(formProps){
    formProps.day = this.props.day;
    this.props.addWorkout(formProps);
    // clear form data
    this.props.resetForm();
    // toggle form
  }

  toggleForm(){
    this.setState({ active: !this.state.active });
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { name }} = this.props;
    return (
      <div>
          <h3>No workouts found for today</h3>
          <button className="btn btn-warning" onClick={this.toggleForm.bind(this)}>{ !this.state.active ? 'Add Workout +' : 'Cancel' }</button>
          { this.state.active ? <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <label>Name:</label>
              <input className="form-control" { ...name} />
              {name.touched && name.error && <div className="error">{name.error}</div>}
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Save</button>
          </form> : null }
      </div>
    );
  }
}

function validate(formProps){
  const errors = {};

  if (!formProps.name){
    errors.name = 'Please enter a name for the exercise';
  }

  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.workout.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['name'],
  validate
}, mapStateToProps, actions)(AddWorkout);
