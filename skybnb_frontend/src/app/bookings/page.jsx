'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useAuth } from '@/components/auth/AuthProvider';


const bookings = () => {
    const [bookedEntries, setBookedEntries] = useState([])
    const Router=useRouter()
    const token = Cookies.get('token')
    if (!token) {
        console.log(token)
        Router.push('/login')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/v1/booking/booking-history`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + Cookies.get('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookedEntries(data.data);
                } else {
                    console.error('Failed to fetch data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex w-full flex-wrap justify-center">
            <div>
                <h1 className=" font-extrabold h-12 m-5">Booking History</h1>
            </div>
            {bookedEntries.map((booking) => (
                <div key={booking.id} className=" mx-16 mt-6 defaultBorder customShadow p-4 w-full border rounded-lg">
                    <p className="font-bold">{booking?.hotel.name}</p>
                    <p>{booking?.hotel.city}</p>
                    <p>Dates Booked: {booking.checkInDate} to {booking.checkOutDate}</p>
                    <p>Total Price: ₹{booking.totalPrice}</p>
                </div>
            ))}
        </div>
    );
}
export default bookings