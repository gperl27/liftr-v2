import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
var LineChart = require("react-chartjs").Line;
import ChooseExercise from './choose_exercise';
import NotableStats from './notable_stats';

class Analytics extends Component {
  componentWillMount(){
    this.props.uniqueExercises();
    const name = 'leg press';
    this.props.exerciseStats({name});
  }


  render() {
    if(!this.props.exercise || !this.props.exercises){
      return <div>loading...</div>;
    }

    // sort current exercise from earliest date to latest
    const exercise = this.props.exercise.sort(function(a,b){
      return new Date(a.workout.day) - new Date(b.workout.day);
    });

    const weights = exercise.map(e => { return e.weight; });
    const sets = exercise.map(e => { return e.sets; });
    const reps = exercise.map(e => { return e.reps; });
    const dates = exercise.map(e => { return e.workout.day; });

    const chartOptions = {
      responsive: true
    }

    var chartData = {
      // day here
      labels: dates,
      datasets: [
        {
          label: "Weight",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: weights,
          spanGaps: false,
        },
        {
          label: "Sets",
          fillColor: "rgba(41, 128, 185, 0.5)",
          strokeColor: "none",
          pointColor: "rgba(41, 128, 185, 0.9)",
          pointStrokeColor: "rgba(41, 128, 185, 0)",
          pointHighlightFill: "rgba(41, 128, 185, 0.9)",
          pointHighlightStroke: "rgba(41, 128, 185, 0)",
          data: sets,
        },
        {
          label: "Reps",
          fillColor: "rgba(155, 89, 182, 0.5)",
          strokeColor: "none",
          pointColor: "rgba(155, 89, 182, 0.9)",
          pointStrokeColor: "rgba(231, 76, 60, 255, 0)",
          pointHighlightFill: "rgba(155, 89, 182, 0.9)",
          pointHighlightStroke: "rgba(231, 76, 60, 0)",
          data: reps,
        }
      ]
    };

    return (
      <div>
        <h3>Choose an exercise to see your progress!</h3>
        <ChooseExercise
          exercises={this.props.exercises}
          fetchExercise={this.props.exerciseStats}
        />
        <LineChart
          data={chartData}
          width="600" height="250"
          options={chartOptions}
        />
        <NotableStats
          stats={this.props.exercise}
         />
        <h6>**Exercises that are missing data are not accounted for in these statistics!</h6>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { exercise: state.exercise.exercise, exercises: state.exercise.exercises };
}

export default connect(mapStateToProps, actions)(Analytics);
