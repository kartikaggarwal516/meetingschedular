import React, { Component } from "react"
import axios from "axios"
import leftbtn from "./Images/leftbutton.png"
import rightbtn from "./Images/rightbutton.png"
import "./homestyle.css"
import { Button } from "react-bootstrap"

const url = "https://fathomless-shelf-5846.herokuapp.com/api/schedule?date="
const today = new Date()
const monthlist = ["Jan", "Feb", "Mar", "Apr ", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class Home extends Component {
    state = {
        schedule: [],
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear()
    }

    getUserData = () => {
        const self = this
        axios.get(`${url}"${this.state.day}/${this.state.month + 1}/${this.state.year}"`)
            .then( (response) => {
                // handle success
                console.log(response);
                self.setState({ schedule: response.data })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    renderMeetingSchedule = () => {
        return this.state.schedule.map((meeting, i) => {
            const { start_time, end_time, description } = meeting
            return (
                <div key={i} className="events" >
                    <div className="time">{`${start_time} - ${end_time}`}</div>                    
                    <div className="desc">{description}</div>
                </div>
            )
        })
    }

    nextDay = () => {
        if (this.state.day == 31 && this.state.month == 11) {
            this.setState({
                month: 0,
                year: this.state.year + 1
            })
        }
        else if (this.state.month % 2 == 0 && this.state.day == 31) {
            this.setState({
                day: (this.state.day % 31) + 1,
                month: this.state.month + 1
            })
        }
        else if (this.state.month == 1) //For feb month
        {
            if (this.state.year % 4 == 0 && this.state.day == 29) //Leap Year
            {
                this.setState({
                    day: (this.state.day % 29) + 1,
                    month: this.state.month + 1
                })
            }
            else if (this.state.year % 4 !== 0 && this.state.day == 28)
                this.setState({
                    day: (this.state.day % 28) + 1,
                    month: this.state.month + 1
                })
            else
                this.setState({
                    day: this.state.day + 1
                })
        }
        else if (this.state.month % 2 !== 0 && this.state.day == 30) {
            this.setState({
                day: (this.state.day % 30) + 1,
                month: this.state.month + 1
            })
        }
        else
            this.setState({
                day: this.state.day + 1
            })
    }

    prevDay = () => {
        if (this.state.day == 1 && this.state.month == 0) {
            this.setState({
                month: 11,
                year: this.state.year - 1
            })
        }
        else if (this.state.year % 4 !== 0 && this.state.month == 2 && this.state.day == 1) {
            this.setState({
                day: 28,
                month: this.state.month - 1
            })
        }
        else if (this.state.year % 4 == 0 && this.state.month == 2 && this.state.day == 1) {
            this.setState({
                day: 29,
                month: this.state.month - 1
            })
        }
        else if (this.state.month % 2 == 0 && this.state.day == 1) {
            this.setState({
                day: 30,
                month: this.state.month - 1
            })
        }
        else if (this.state.month % 2 !== 0 && this.state.day == 1) {
            this.setState({
                day: 31,
                month: this.state.month - 1
            })
        }
        else {
            this.setState({
                day: this.state.day - 1
            })
        }
    }

    scheduleMeeting = () => {
        this.props.history.push({
            pathname: '/Addmeeting',
            state: this.state
          })
    }

    componentDidMount() {
        this.getUserData();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.day!==prevState.day)
        {
            this.getUserData();
        }
    }

    render() {
        const { day, month, year } = this.state
        return (
            <div className="container">
                <div className="header">
                    <img src={leftbtn} alt="" height="40px" width="40px" onClick={this.prevDay} />
                    <div>{`${day} ${monthlist[month]} ${year}`}</div>
                    <img src={rightbtn} alt="" height="40px" width="40px" onClick={this.nextDay} />
                </div>
                <div className="schedulebody">
                    <div className="meetings">
                        {this.renderMeetingSchedule()}
                    </div>
                    <div className="onpress">
                    <Button variant="primary" onClick={this.scheduleMeeting} >Add Meeting</Button>
                    </div>                    
                </div>
            </div>
        )
    }
}