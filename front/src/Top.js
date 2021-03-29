import React, { Component } from "react";
import left from "./left.png";
import right from "./right.png";

export default class Top extends Component {
  render() {
    /* console.log("yearNMonth: " + this.props.yearNmonth);
     console.log("today: " + this.props.today)
     console.log("moment", moment().format("YYYY-MM"))*/
    return (
      <div className="Top-base">
        <h3 className="Top-today">
          <span
            className="Top-goToday"
            onClick={() => {
              this.props.backToday();
            }}
          >
            오늘
          </span>
          {this.props.today}
        </h3>
        <ul className="Top-buttons">
          <li
            onClick={() => {
              this.props.topmoveMonth(+1);
            }}
          >
            <img src={right} alt="right"></img>
          </li>
          <li>
            <h2 className="Top-yearNmonth">{this.props.yearNmonth}</h2>
          </li>
          <li
            onClick={() => {
              this.props.topmoveMonth(-1);
            }}
          >
            <img src={left} alt="left"></img>
          </li>
        </ul>
      </div>
    );
  }
}
