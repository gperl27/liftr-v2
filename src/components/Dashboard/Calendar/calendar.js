import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Workout from '../Workouts/workout';

BigCalendar.momentLocalizer(moment);

//add to date prototype to play nice with api
//source: http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};

class Calendar extends Component {
  componentWillMount(){
    this.props.fetchWorkouts();
  }

  clickDay(d){
    const date = new Date(d).yyyymmdd();
    this.props.fetchWorkout({date})
  }

  renderWorkout(d){
    return <Workout day={d} />
  }

  render() {

    if(!this.props.workouts){
      return <div>...Loading</div>;
    }

    const date = new Date().yyyymmdd();

    var events = this.props.workouts.map((workout) => {
      return {
        // 'id' : workout.id,
        'title' : workout.name,
        'allDay': true,
        'start' : new Date(workout.day).setHours(24),
        'end' : new Date(workout.day).setHours(24)
      }
    })

    const divStyle = {
      height: '500px'
    }

    return (
      <div>
        <BigCalendar style={divStyle}
          popup

          onSelectEvent={event => this.clickDay(event.start)}
          events={events}
          defaultDate={new Date()}
        />
        {this.renderWorkout(date)}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workouts: state.workout.workouts };
}

export default connect(mapStateToProps, actions)(Calendar);
