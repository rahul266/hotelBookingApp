import React, { useEffect, useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import "../app/DatePickerStyles.css"
import Cookies from 'js-cookie';
import Modal from 'react'

const Card = ({ id, UUID, name, descreption, pricePerNight, onClick }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookedAndBlockedDates,setBookedAndBlockedDates]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/v1/booking/booked-dates?UUID=${UUID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + Cookies.get('token')
                }
            });
            const data = await response.json()
            console.log(data)
            if (data.data) {
                setBookedAndBlockedDates(data.data)
            }
            else if (data?.error?.code == 401) {
                logout()
            }
        }
        fetchData()
    },[])


    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        calculateTotal(startDate, endDate);
    };

    const isOutsideRange = (day) => {
        try {
            const isDateAvailable = bookedAndBlockedDates.some(({ checkIn, checkOut }) => {
                if (startDate) {
                    const state = !(moment(day).isBefore(checkIn) || moment(day).isSameOrAfter(checkOut))
                    return state || (moment(startDate).isBefore(checkIn) && moment(day).isAfter(checkIn))
                }
                return !(moment(day).isBefore(checkIn) || moment(day).isSameOrAfter(checkOut));
            });
            return isDateAvailable || moment().startOf('day').diff(day) > 0;
        } catch (error) {
            console.error('Error fetching booking dates:', error);
            return true;
        }
    };

    const handleBookClick = async () => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/v1/booking/block-dates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify({
                    "hotelId": UUID,
                    "checkInDate": startDate,
                    "checkOutDate":endDate
                })
            });
            
            if (response.status===200) {
                const data = await response.json()
                console.log({ totalPrice, startDate, endDate })
                onClick({ totalPrice, startDate, endDate }); 
            }
            else if (response.status === 401) {
                logout()
            } else if (response.status === 409) {
                console.log("dates currently in processing..")
            }
        }
        fetchData()
    };

    const calculateTotal = (startDate, endDate) => {
        if (startDate && endDate) {
            const numberOfNights = endDate.diff(startDate, 'days');
            const total = numberOfNights * pricePerNight;
            setTotalPrice(total);
        } else {
            setTotalPrice(0);
        }
    };

    return (
        <div>
        <div className="customShadow rounded-2xl flex flex-col p-4 mt-4 h-96 w-96">
            <div className="flex items-center ml-8 mt-4">
                <span className="text-xl font-bold mr-2">₹{pricePerNight}</span>
                <p>/Night</p>
            </div>
            <div className="justify-items-center mx-auto mt-3 justify-center">
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={handleDatesChange}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    numberOfMonths={1}
                    isOutsideRange={isOutsideRange}
                    startDatePlaceholderText="Check In"
                    endDatePlaceholderText="Check Out"
                />
            </div>
            <div className="flex items-center ml-8 mt-4">
                <p>Total: ₹{totalPrice}</p>
            </div>
            <div className="w-full mt-auto">
                    <button className="rounded-md w-full bg-pantone text-white px-4 py-2 mt-4" onClick={handleBookClick}>Book</button>
            </div>
            </div>
        </div>
    );
};

export default Card;

