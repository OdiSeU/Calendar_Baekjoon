import React, { Component } from "react";
import DayOfTheWeek from "./DayOfTheWeek";
import AllDays from "./AllDays";
import moment from "moment";

export default class MainCalendar extends Component {
  state = {
    end: 6,
    begin: 0,
  };
  Down_week = () => {
    this.setState({
      end: this.state.end - 1,
      begin: this.state.begin - 1,
    });
  };
  Up_week = () => {
    this.setState({
      end: this.state.end + 1,
      begin: this.state.begin + 1,
    });
  };

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

    for (let idx = this.state.begin; idx < this.state.end; idx++) {
      default_weeks(idx);
    }
    return _Weeks;
  };

  render() {
    return (
      <div className="MainCalendar-base">
        <div>
          <button onClick={this.Down_week}>Down!</button>
          <button onClick={this.Up_week}>Up!</button>
        </div>
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
