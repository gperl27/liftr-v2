import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

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
    let events = [  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  }];

  const divStyle = {
    height: '500px'
  }

    return (
      <div>
        <BigCalendar style={divStyle}
          popup
          events={events}
          defaultDate={new Date()}
        />
      </div>
    );
  }
}

// function mapStateToProps(state){
//   return { workouts: state.workout.workouts };
// }

// export default connect(mapStateToProps, actions)(Calendar);

export default Calendar;
