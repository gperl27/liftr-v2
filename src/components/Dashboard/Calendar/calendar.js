import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Calendar extends Component {
  // componentWillMount(){
  //   this.props.fetchWorkouts();
  // }

  // handleDeleteExercise(props, id){
  //   props.deleteExercise(id);
  // }
  //
  // handleAddExercise(){
  //   this.setState({ adding: !this.state.adding});
  // }

  render() {

    // if(!this.props.workouts){
    //   return <div>...Loading</div>;
    // }

    return (
      <div>
        Calendar here
      </div>
    );
  }
}

// function mapStateToProps(state){
//   return { workouts: state.workout.workouts };
// }

// export default connect(mapStateToProps, actions)(Calendar);

export default Calendar;
