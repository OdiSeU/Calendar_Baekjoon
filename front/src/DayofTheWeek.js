import React, { Component } from "react";

export default class DayOfTheWeek extends Component {
  weekdateToArray = (dates) => {
    if (Array.isArray(dates)) {
      return dates;
    } else if (typeof dates === "string") {
      return dates.split(","); //콤마로 구분된 월,화, ... mon,tue,... 月,火... 등등 받음
    } else {
      return ["일", "월", "화", "수", "목", "금", "토"];
    }
  };
  mapWeekdayOrend = (dateArray) => {
    try {
      if (dateArray.length !== 7) {
        alert(new Error("you must have 7 days!!"));
        dateArray = ["일", "월", "화", "수", "목", "금", "토"];
      }

      return dateArray.map((date, index) => {
        const cssUseName = () => {
          let cssUseName = "Calendar-daysOrend";
          if (index === 0) return cssUseName + " sunday";
          else if (index === 6) return cssUseName + " saturday";
          else return cssUseName + " weekdays";
        };
        return (
          <div className={cssUseName()} key={date}>
            {date}
          </div>
        );
      });
    } catch {
      throw new Error("I don't know what your thinking");
    }
  };

  render() {
    return (
      <div className="Week-base">
        <div className="MainCalendar-header">
          {this.mapWeekdayOrend(this.weekdateToArray(this.props.dates))}
        </div>
      </div>
    );
  }
}
