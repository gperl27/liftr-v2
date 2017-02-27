import React, { Component } from 'react';

function avg(arr){
  return arr.reduce(function(x, y){
    return x + y;
  })/arr.length;
}

class NotableStats extends Component {
  render() {
    if(this.props.stats.length === 0){
      return <div>Waiting for choice to be made...</div>
    }

    const weights = this.props.stats.map(e => { return e.weight; });
    const sets = this.props.stats.map(e => { return e.sets; });
    const reps = this.props.stats.map(e => { return e.reps; });

    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);

    const avgSets = Math.round(avg(sets));
    const avgReps = Math.round(avg(reps));

    // const avgSets = this.props.sets.reduce(function(p, c) {
    //   return p + c;
    // })/this.props.sets.length;

    // const avgReps = this.props.reps.reduce((p, c) => {
    //   return p + c;
    // })/this.props.reps.length;

    return (
      <div className="row text-center">
        <div className="col-lg-6">
          <h4>Max Lift: </h4>
          <h3>{maxWeight}</h3>
          <h4>Min Lift: </h4>
          <h3>{minWeight}</h3>
        </div>
        <div className="col-lg-6">
          <h4>Average Sets: </h4>
          <h3>{avgSets}</h3>
          <h4>Average Reps: </h4>
          <h3>{avgReps}</h3>
        </div>
      </div>
    );
  }
}
export default NotableStats;
