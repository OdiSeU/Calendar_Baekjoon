import React, { Component } from "react";
import moment from "moment";

export default class AllDays extends Component {

  Days = (firstFormat, YM,weekIdx) => {
   
    const _days = [];
    for (let i = 0; i < 7; i++) {
      const Day = moment(firstFormat).add(i, "d");
      _days.push({
        YMDFormat: Day.format("YYYY-MM-DD"),
        getDay: Day.format("D"),
        isWeekned: false,
        YM,
       _weekIdx:weekIdx,
      });
      
    }
   console.log(_days)
    return _days;
  };

  makeDayCompo = (Days, calendarMonthYear, selected, fn = () => { }) => {
  
    const thisMonth = moment(calendarMonthYear);
    
    return Days.map((dayInfo, i) => {
      let cssUseName = "days-color";
      
    
      if (!thisMonth.isSame(dayInfo.YMDFormat, "month")) {
        cssUseName = "not-thisMonth";
      } else if (i === 0) {
        cssUseName = "sunday";
      } else if (i === 6) {
        cssUseName = "saturday";
      }

      if (moment(dayInfo.YMDFormat).isSame(selected, "day")) {
        cssUseName = "selected";
      }

      return (
        <div
          className={"AllDays-days "+cssUseName}
          onClick={() => fn(dayInfo.YMDFormat)}
          key={`${i}`}
        >
          <label className="AllDays-days-label" >{dayInfo.getDay}</label>
        </div>
      );
    });
  };

  test=()=>{
    const t1 = document.getElementsByClassName("AllDays-week")
   // console.log(t1[1])
  }

  render() {
   // this.test()
    return (
      <div className="AllDays-week" >
        {this.makeDayCompo(
          this.Days(
            this.props.firstDayOfThisWeekformat,
            this.props.thisCalendar,
            this.props.weekIdx
          ),
          this.props.thisCalendar,
          this.props.selected,
          this.props.fn
        )}
      </div>
    );
  }
}
