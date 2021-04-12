import React, { Component } from "react";
// import DayOfTheWeek from "./DayOfTheWeek";
import AllDays from "./AllDays";
import moment from "moment";
export default class MainCalendar extends Component {

     state ={
      idx:0
     }
      
     componentDidMount = () => {
       window.addEventListener('scroll', this.handleScroll);
    }
      
    componentWillUnMount = () => {
       window.removeEventListener('scroll', this.handleScroll);
     }

    check =(scrollTop,clientHeight,scrollHeight)=>{
      if(scrollTop + clientHeight === scrollHeight){
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

  // nextWeeks=(nextMonth, selected, click)=>{
  //   const secondDayOfMonth = moment(nextMonth).startOf("month");
  //   const secondDateOfMonth = secondDayOfMonth.get("d");
  //   const secondDayOfWeek = secondDayOfMonth.clone().add(-secondDateOfMonth, "d");
  //   const _nextWeeks = [];

  //   const next_weeks = (idx) => {
  //     _nextWeeks.push(
  //       <AllDays
  //         //key={`${idx}`}
  //         thisCalendar={secondDayOfMonth.format("YYYY-MM")}
  //         firstDayOfThisWeekformat={secondDayOfWeek
  //           .clone()
  //           .add(idx * 7, "d")
  //           .format("YYYY-MM-DD")}
  //         selected={selected}
  //         fn={click}
  //       />
  //     );
  //   };
  //   for (let i = 0; i <6; i++) {
  //     next_weeks(i)
  //   }
  //   return  _nextWeeks;
  // }
    
    
  Weeks = (monthYear, selected, click) => {
    const firstDayOfMonth = moment(monthYear).startOf("month");
    const firstDateOfMonth = firstDayOfMonth.get("d");
    const firstDayOfWeek = firstDayOfMonth.clone().add(-firstDateOfMonth, "d");
    console.log("firstDayOfMonth: ",firstDayOfMonth.format("YYYY-MM-DD"))
    console.log("firstDateOfMonth", firstDateOfMonth)
    console.log("firstDayOfWeek",firstDayOfWeek.format("YYYY-MM-DD"))
    const _Weeks = [];

    const default_weeks = (idx) => {
      _Weeks.push(
        <AllDays
          //key={`${idx}`}
          thisCalendar={firstDayOfMonth.format("YYYY-MM")}
          firstDayOfThisWeekformat={firstDayOfWeek
            .clone()
            .add(idx * 7, "d")
            .format("YYYY-MM-DD")}
          selected={selected}
          fn={click}
          weekIdx={idx}
        />
       
      );
      console.log(idx)
    };
    for (let i = 0; i <10; i++) {
      default_weeks(i)
    }


    
   console.log(_Weeks)
   return _Weeks;
  };

  
  

  render() {
    
    //console.log(this.state._Weeks);
    return (
      <div className="MainCalendar-base" >
        <div>
          <button onClick={this.props.go_up/*props.Down_week*/}>Down!</button>
          <button onClick={this.props.Up_week}>Up!</button>
        </div >
        {/* <DayOfTheWeek /> */}
        <div className="remakeWeek" >
         {this.Weeks(
           this.props.YMD,
           this.props.selected,
           this.props.changeSelect
          )}
        </div>
        <div> asdasdasds</div>
        {/* <div className="nextWeek">
          {this.nextWeeks(
            this.props.nextMonth,
            this.props.selected,
            this.props.changeSelect
           )}
        </div> */}
      </div>
    );
  }
}
