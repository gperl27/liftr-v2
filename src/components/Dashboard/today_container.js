import React, { Component } from 'react';
import Workout from './Workouts/workout';
import Time from 'react-time'

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

class TodayContainer extends Component {
  render() {
    let now = new Date();
    let workoutDate = now.yyyymmdd();

    return (
      <div className="row">
        <h1>Today is <Time value={now} format="YYYY/MM/DD" /></h1>
        <hr></hr>
        <Workout date={workoutDate} />
      </div>
    );
  }
}

export default TodayContainer;
