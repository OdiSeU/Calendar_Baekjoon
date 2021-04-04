import React, { Component } from "react";
import MainCalendar from "./MainCalendar";
import DayOfTheWeek from "./DayOfTheWeek";
import Top from "./Top";
import Login from "./Login";
import "./index.css";
import moment from "moment";

export default class Container extends Component {
  state = {
    yearNmonth: moment(),
    today: moment(),
    selected: moment().format("YYYY-MM-DD"),
    end: 5,
    begin: -1,

  };

  /*날짜 더블 클릭하면 전달로 이동함 그냥 만든 클릭함수임 뭐 만들지 몰라서*/
  click = (clickedDate) => {
    console.log(clickedDate);
    if (moment(clickedDate).isSame(this.state.selected, "day")) {
      this.moveMonth(-1);
    }
  };
  topmoveMonth =(month)=>{
    this.setState({
      yearNmonth: this.state.yearNmonth.add(month, "months"),
      end: 6,
      begin: 0,
    });

  }
  moveMonth = (month) => {
    this.setState({
      yearNmonth: this.state.yearNmonth.add(month, "months"),
    });
  };
  backToday = () => {
    this.setState({
      yearNmonth: moment(),
    });
  };


  Down_week = () => {
    this.setState({
      end: this.state.end - 1,
      begin: this.state.begin - 1,
    });
    if(this.state.end===3){
      this.moveMonth(-1);
      this.setState({
        end:8,
        begin:2,
      })
    }
    
  };
  Up_week = () => {
    this.setState({
      end: this.state.end + 1,
      begin: this.state.begin + 1,
    });
    
    if(this.state.begin===2){
      this.moveMonth(+1);
      this.setState({
        end:3,
        begin:-3,
     
     })
    
    }
  };



  /**
   * 달력 클릭 함수
   * @param {moment} clickedDate 클릭된 날짜
   *
   */
  changeSelect = (clickedDate) => {
    if (moment(clickedDate).isSame(this.state.selected, "day")) {
      this.click(clickedDate);
      return; /*중복 클릭 자원낭비 방지 */
    }
    this.setState({
      selected: clickedDate,
    });
    this.click(clickedDate);

    /*if (moment(clickedDate).isBefore(this.state.yearNmonth, "month")) {
      this.moveMonth(-1);
    } else if (moment(clickedDate).isAfter(this.state.yearNmonth, "month")) {
      this.moveMonth(1);
    }*/
  };

  render() {
    return (
      <div>
        <div className="container">
          <Top
            yearNmonth={this.state.yearNmonth.format("YYYY년 MM월")}
            today={this.state.today.format("은 YYYY년 MM월 DD일 입니다")}
            moveMonth={this.moveMonth}
            backToday={this.backToday}
            topmoveMonth={this.topmoveMonth}

          />
          <DayOfTheWeek className="Week-base"></DayOfTheWeek>
          <MainCalendar
            YMD={this.state.yearNmonth.format("YYYY-MM-DD")}
            selected={this.state.selected}
            changeSelect={this.changeSelect}
            moveMonth={this.moveMonth}
            begin={this.state.begin}
            end={this.state.end}
            Down_week={this.Down_week}
            Up_week={this.Up_week}
            key={this.state.today}

          />
        </div>
        <Login></Login>
      </div>
    );
  }
}
