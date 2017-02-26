import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
var LineChart = require("react-chartjs").Line;

class Analytics extends Component {
  componentWillMount(){
    this.props.uniqueExercises();
    this.props.exerciseStats('test');
  }

  render() {
    if(!this.props.exercise){
      return <div>loading...</div>;
    }

    console.log(this.props);

    const weights = this.props.exercise.map(e => {
      return e.weight;
    })

    const dates = this.props.exercise.map(e => {
      return e.workout.day;
    })

    console.log(weights, dates);

    var chartData = {
            // day here
            labels: dates,
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: weights,
                    spanGaps: false,
                }
            ]
        };

    return (
      <div>
        <div>Filter bar here</div>
        <LineChart data={chartData} options={"test"} width="600" height="250" />
        <div>Exercise stats</div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { exercise: state.exercise.exercise, exercises: state.exercise.exercises };
}

export default connect(mapStateToProps, actions)(Analytics);
