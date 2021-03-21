import React, { Component } from "react";
import DayOfTheWeek from "./DayofTheWeek";
import AllDays from "./AllDays";
import moment from "moment";

export default class MainCalendar extends Component {
  Weeks = (monthYear, selected, click) => {
    const firstDayOfMonth = moment(monthYear).startOf("month");
    const firstDateOfMonth = firstDayOfMonth.get("d");

    const firstDayOfWeek = firstDayOfMonth.clone().add(-firstDateOfMonth, "d");

    const _Weeks = [];

    for (let i = 0; i < 6; i++) {
      _Weeks.push(
        <AllDays
          key={`${i}`}
          thisCalendar={firstDayOfMonth.format("YYYY-MM")}
          firstDayOfThisWeekformat={firstDayOfWeek
            .clone()
            .add(i * 7, "d")
            .format("YYYY-MM-DD")}
          selected={selected}
          fn={click}
        />
      );
    }
    return _Weeks;
  };

  render() {
    return (
      <div className="MainCalendar-base">
        <DayOfTheWeek />
        {this.Weeks(
          this.props.YMD,
          this.props.selected,
          this.props.changeSelect
        )}
      </div>
    );
  }
}
