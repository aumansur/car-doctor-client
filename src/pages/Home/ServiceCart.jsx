import { BiRightArrowAlt } from 'react-icons/bi';
const ServiceCart = ({ service }) => {
    const { title, img, price } = service;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{title}</h2>
                <div className='flex justify-between text-[#FF3811]'>
                    <p>Price: ${price}</p>
                    <span className='text-right'><BiRightArrowAlt className='text-right' size={30}></BiRightArrowAlt> </span>
                </div>

            </div>
        </div>
    );
};

export default ServiceCart;