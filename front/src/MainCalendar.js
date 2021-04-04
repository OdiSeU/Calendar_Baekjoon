import React, { Component } from "react";
// import DayOfTheWeek from "./DayOfTheWeek";
import AllDays from "./AllDays";
import moment from "moment";
export default class MainCalendar extends Component {
    constructor() {
        super();
         /* this.state = {
            scrollTop: 0
          }*/
      }
      
      componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
      }
      
      componentWillUnMount = () => {
        window.removeEventListener('scroll', this.handleScroll);
      }

      check =(scrollTop,clientHeight,scrollHeight)=>{

        if(scrollTop + clientHeight === scrollHeight){
          console.log("아 진짜 시바")
          this.props.Up_week();
        }
      }
      

      handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight =e.target.clientHeight;
        const scrollHeight=e.target.scrollHeight;
        //console.log("scrollTop: "+ scrollTop, "clinetHeight: "+ clientHeight ,"scrollHeight:"+ scrollHeight)
        if(scrollTop + clientHeight >= scrollHeight){
          this.props.Up_week();
        }
        this.check(scrollTop,clientHeight,scrollHeight);
       /* else{
          this.props.Down_week();
        }*/

      }

    
    
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
      <div className="MainCalendar-base" >
        <div>
          <button onClick={this.props.Down_week}>Down!</button>
          <button onClick={this.props.Up_week}>Up!</button>
        </div >
        {/* <DayOfTheWeek /> */}
        <div className="Scroll" onScroll={this.handleScroll} >
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
