import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const CheckOut = () => {
    const { user } = useContext(AuthContext)
    const service = useLoaderData()
    const { title, price, _id, img } = service;


    const handleBookSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;

        const date = form.date.value;
        const email = user?.email;

        const amount = form.amount.value;
        const booking = {
            customerName: name,
            email,
            date,
            img,
            service: title,
            service_id: _id,
            price: amount
        }
        console.log(booking)

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(booking)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("order confirmed")
                }
                console.log(data)
            })

    }

    return (
        <div>
            <h1> Book details: {title}</h1>

            <div className="card-body p-16">

                <form onSubmit={handleBookSubmit} >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" placeholder="email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="amount" defaultValue={"$" + price} className="input input-bordered" />

                        </div>

                    </div>
                    <div className="form-control mt-6">
                        <input className="my-btn" type="submit" value="Order Confirm" />
                    </div>

                </form>
            </div>

        </div>
    );
};

export default CheckOut;