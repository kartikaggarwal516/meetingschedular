import React, { Component } from "react"
import DatePicker from "react-datepicker";
import { Form, Button } from "react-bootstrap"
import "./addmeetingstyle.css"

import "react-datepicker/dist/react-datepicker.css";

export default class Addmeeting extends React.Component {
    constructor(props) {
        super(props);
        const { day, month, year } = this.props.location && this.props.location.state
        
        this.state = {
            startDate: new Date(`${year}-${month + 1}-${day}`), //Format 2020-04-5
            startTime: new Date(`${year}-${month + 1}-${day}`),
            endTime: new Date(`${year}-${month + 1}-${day}`)            
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    startTimeChange = date => {
        console.log("startTime ", date.getHours()) //getHours()	Get the hour (0-23)
        // getMinutes()
        this.setState({
            startTime: date
        });
    };

    endTimeChange = date => {       
        this.setState({
            endTime: date
        });
        
    };

    mySubmitHandler = (event) => { 
        event.preventDefault();
        let slotAvailable = false
        const userEventStart = this.state.startTime.getTime(), userEventEnd = this.state.endTime.getTime()
        const year = this.state.startDate.getFullYear(), month = this.state.startDate.getMonth(), day = this.state.startDate.getDate()
        
        this.props.location.state.schedule.map((event) => {
            // console.log(" event.start_time.split", event.start_time.split(":"));

            const [startHour, startMinutes] = event.start_time.split(":")
            const [endHour, endMinutes] = event.end_time.split(":")
            const eventStart = new Date(year, month , day, startHour, startMinutes).getTime()   //new Date(2019,10,30, 12, 34)
            const eventEnd = new Date(year, month , day, endHour, endMinutes).getTime()

            // console.log("eventStart without getTime() ",new Date(year, month , day, startHour, startMinutes), "eventStart without getTime() ",new Date(year, month , day, endHour, endMinutes))
            // console.log("this.state.startTime ",this.state.startTime," Month ",month," day ",day)
            // console.log("eventStart ",eventStart," eventEnd ",eventEnd," userEventStart ",userEventStart," userEventEnd ",userEventEnd)
            // console.log("Check 1 ",eventStart <= userEventStart && userEventStart <= eventEnd," Check 2 ",eventStart <= userEventEnd && userEventEnd <= eventEnd)

            if ( (eventStart <= userEventStart && userEventStart <= eventEnd) || (eventStart <= userEventEnd && userEventEnd <= eventEnd) ) {
                slotAvailable = false
            }
            else {
                slotAvailable = true
            }
        })
        if (slotAvailable) {
            alert("Slot available")

        } else {
            alert("Slot not available");

        }

    }

    render() {
        const { startDate, startTime, endTime } = this.state
        console.log(this.props.location.state)
        return (
            <div className="container">
                <Form onSubmit={this.mySubmitHandler}>                    
                    <div className="meetingDate">
                        <DatePicker
                            selected={startDate}
                            onChange={this.handleChange}                            
                        />
                    </div>
                    <div className="meetingTime">
                        <div>
                            <DatePicker
                                selected={startTime}
                                onChange={this.startTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                        <div className="eTime">
                            <DatePicker
                                selected={endTime}
                                onChange={this.endTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />                            
                        </div>
                    </div>
                    <div className="description">
                        <Form.Control as="textarea" rows="3" placeholder="Description" />
                    </div>
                    <div className="submit">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>

                </Form>

            </div>
        );
    }
}