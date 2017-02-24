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
  constructor(props){
    super(props);

    this.state = { day: moment(new Date()).format('YYYY-MM-DD') };
  }

  componentWillMount(){
    this.props.fetchWorkouts();
  }

  clickDay(date){
    date = moment(date).format('YYYY-MM-DD');
    this.props.fetchWorkout({date});
    this.setState({ day: date });
  }

  render() {

    if(!this.props.workouts){
      return <div>...Loading</div>;
    }

    const now = moment(new Date()).format('YYYY-MM-DD');

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
          selectable
          onSelectEvent={event => this.clickDay(event.start)}
          onSelectSlot={(slotInfo) => this.clickDay(slotInfo.start)}
          events={events}
          defaultDate={new Date()}
        />
      <Workout day={this.state.day} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return { workouts: state.workout.workouts };
}

export default connect(mapStateToProps, actions)(Calendar);
