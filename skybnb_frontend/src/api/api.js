import Cookies from 'js-cookie';

const registerStudent = async (data) => {
    try {
        const response = await fetch(`http://localhost:8000/v1/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data?.error.message);
        }
        const responseData=await response.json()
        return responseData;
    } catch (error) {
        console.error('Error registering student:', error);
        throw new Error(error);
    }
}

const getHotels = async () => {
    try {
        const response = await fetch(`http://localhost:8000/v1/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+Cookies.get('token')
            },
            body: JSON.stringify({
                "query": "{ hotels { id UUID name pricePerNight } }"
            })
        });
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data?.error.message);
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error registering student:', error);
        throw error;
    }
}

const getBookingHistory = async () => {
    try {
        const response = await fetch(`http://localhost:8000/v1/booking/booking-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + Cookies.get('token')
            }
        });
        return response
    } catch (error) {
        console.error('failed to get history', error);
        throw new Error(error);
    }
}

export default { getHotels, registerStudent, getBookingHistory }