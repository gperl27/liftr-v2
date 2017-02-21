import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from  '../../../actions';

class AddExercise extends Component {
  handleFormSubmit(formProps){
    // call action creator to sign up the user
    // can assume redux form handles validation
    // attach date onto prop to grab the workout
    // api will create a new workout if no workout exists
    formProps.date = this.props.date;
    this.props.addExercise(formProps);
    // clear form data
    this.props.resetForm();
    // toggle form
    this.props.handleAddExercise();
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
    const { handleSubmit, fields: { name, sets, reps, weight }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Name:</label>
          <input className="form-control" { ...name} />
          {name.touched && name.error && <div className="error">{name.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Sets:</label>
          <input type="number" className="form-control" { ...sets} />
        </fieldset>
        <fieldset className="form-group">
          <label>Reps:</label>
          <input type="number" className="form-control" { ...reps} />
        </fieldset>
        <fieldset className="form-group">
          <label>Weight:</label>
          <input type="number" className="form-control" { ...weight} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Add Exercise</button>
      </form>
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
  fields: ['name', 'reps', 'sets', 'weight'],
  validate
}, mapStateToProps, actions)(AddExercise);
