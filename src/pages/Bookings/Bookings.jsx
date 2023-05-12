import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";


const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url])

    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete this booking')
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE',

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Delete',
                            text: 'Your booking deleted successfully',
                            footer: '<a href="">Why do I have this issue?</a>'
                        })
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining)
                    }
                })


        }
    }

    const handleConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    // update state 
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining]
                    setBookings(newBookings)
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl">Your bookings:{bookings.length} </h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                                Delete
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>date</th>
                            <th>price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleConfirm={handleConfirm}
                            > </BookingRow>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;