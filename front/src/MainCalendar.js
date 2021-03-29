import React, { Component } from "react";
// import DayOfTheWeek from "./DayOfTheWeek";
import AllDays from "./AllDays";
import moment from "moment";

export default class MainCalendar extends Component {

 
  Weeks = (monthYear, selected, click) => {
    const firstDayOfMonth = moment(monthYear).startOf("month");
    const firstDateOfMonth = firstDayOfMonth.get("d");

    const firstDayOfWeek = firstDayOfMonth.clone().add(-firstDateOfMonth, "d");

    const _Weeks = [];
    const default_weeks = (idx) => {
      _Weeks.push(
        <AllDays
          key={`${idx}`}
          thisCalendar={firstDayOfMonth.format("YYYY-MM")}
          firstDayOfThisWeekformat={firstDayOfWeek
            .clone()
            .add(idx * 7, "d")
            .format("YYYY-MM-DD")}
          selected={selected}
          fn={click}
        />
      );
    };
    for (let idx = this.props.begin; idx <= this.props.end; idx++) {
      default_weeks(idx);
    }
    return _Weeks;
  };

  render() {
    return (
      <div className="MainCalendar-base">
        <div>
          <button onClick={this.props.Down_week}>Down!</button>
          <button onClick={this.props.Up_week}>Up!</button>
        </div >
        {/* <DayOfTheWeek /> */}
        <div className="Scroll">
         {this.Weeks(
           this.props.YMD,
           this.props.selected,
           this.props.changeSelect
          )}
        </div>
      </div>
    );
  }
}
