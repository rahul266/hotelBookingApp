'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import Card from "@/components/datesCard";
import { useAuth } from "@/components/auth/AuthProvider";


const page = (props) => {
    const [hotelDetails, setHotelDetails] = useState(null)
    const [showPayModal, setShowPayModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [startDate, setStartDate] = useState(null)
    const [endDate,setEndDate]=useState(null)
    const [timer, setTimer] = useState(300)
    const router = useRouter()
    const { logout } = useAuth()
    const token = Cookies.get('token')
    if (!token) {
        console.log(token)
        router.push('/login')
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`http://localhost:8000/v1/graphql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + Cookies.get('token')
                    },
                    body: JSON.stringify({
                        "query": `{ hotel(UUID:"${props.params.id}") { id UUID name description city pricePerNight } }`
                    })
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        logout()
                    }
                    const data = await response.json()
                    throw new Error(data?.error?.message)
                }
                const data = await response.json()
                if (data.data) {
                    setHotelDetails(data.data.hotel)
                }
            } catch (err) {
                alert(err)
            }
        }
        fetchdata()
    }, [])
    const showModel = ({ totalPrice, startDate, endDate }) => {
        setTimer(300)
        setTotalPrice(totalPrice)
        setStartDate(startDate)
        setEndDate(endDate)
        setShowPayModal(true)
    }
    const handlePayClick = () => {
        const fetchData = async () => {
            const req = {
                "hotelId": hotelDetails?.UUID,
                "checkInDate": startDate,
                "checkOutDate": endDate,
                "totalPrice": totalPrice

            }
            try {
                const response = await fetch(`http://localhost:8000/v1/booking/confirm-booking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + Cookies.get('token')
                    },
                    body: JSON.stringify(req)
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        logout()
                    } 
                    const data = await response.json()
                    throw new Error(data?.error?.message)
                }
                const data = await response.json()
                router.push('/bookings')
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    };
    const closeModal = () => {
        setShowPayModal(false)
    }
    useEffect(() => {
        let interval;
        if (showPayModal) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    })
    useEffect(() => {
        if (timer === 0) {
            setShowPayModal(false);
        }
    }, [timer]);
    return <div>
        {hotelDetails ? (<div className="container mx-auto p-4">
            <div className="relative h-64">
                <img
                    src="/hotel1.jpg"
                    alt="Banner"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="mt-8">
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">{hotelDetails.name}</h1>
                    <p className="text-gray-600">{hotelDetails.city}</p>
                </div>
                <div className="flex flex-row w-full justify-between mt-10">
                    <div className="">
                        <h2 className="text-xl font-bold">descreption:</h2>
                        <p className="mt-2">{hotelDetails.description}</p>
                    </div>
                    <div className="right-0 mr-0 ">
                        <Card onClick={showModel} {...hotelDetails}></Card>
                    </div>
                </div>
            </div>
            {showPayModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white w-96 p-8 rounded-lg">
                        <h2 className="text-xl font-bold">Payment:</h2>
                        <p className="m-3">Total: ₹{totalPrice}</p>
                        <p className="m-3">Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                        <button className="bg-pantone text-white defaultBorder m-3 p-3 rounded-xl" onClick={handlePayClick}>Pay</button>
                        <button className="bg-gray-400 text-white defaultBorder m-3 p-3 rounded-xl" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>):(<></>)}
    </div>
}

// export const getServerSideProps = async (context) => {
//     const hotelUUID = context.query.id;
//     const response = await fetch(`http://localhost:8000/v1/graphql`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': 'Bearer ' + Cookies.get('token')
//         },
//         body: JSON.stringify({
//             "query": `{ hotels(UUID:${hotelUUID}) { id UUID name pricePerNight } }`
//         })
//     });
//     if (response.status === 200) {
//         const data = await response.json()
//         console.log(data)
//         return { props: { data: data.data.hotel } };
//     }
// }

export default page

