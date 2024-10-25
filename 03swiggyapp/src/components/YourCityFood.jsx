import React, { useState  , useEffect } from 'react'
import { Link } from 'react-router-dom';
function YourCityFood({data = [] , title}) {

    const [filterResturant, setFilterResturant] = useState([]);
    const [filter, setFilter] = useState({
        fastDelivery: false,
        rating4Plus: false,
        costForTwo: false,
        cost: false,
        offers: false,
    });
  
 
    const handleFilterResturant = (filterName) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [filterName]: !prevFilter[filterName],
        }));
    };
        
    useEffect(() => {
        let filtered = data;

        if (filter.fastDelivery) {
            filtered = filtered.filter((r) => r?.info?.sla?.deliveryTime <= 30);
        }
        if (filter.rating4Plus) {
            filtered = filtered.filter((r) => r?.info?.avgRating >= 4);
        }
        if (filter.costForTwo) {
            filtered = filtered.filter((r) => r?.info?.costForTwo.slice(1,4) >= "300" && r?.info?.costForTwo.slice(1,4) <= "600");
        }
        if (filter.cost) {
            filtered = filtered.filter((r) => r?.info?.costForTwo.slice(1,4) <= "300");
        }
        if (filter.offers) {
            filtered = filtered.filter((r) => r?.info?.aggregatedDiscountInfoV3);
        }
        setFilterResturant(filtered);
    }, [filter, data]);

  return (
    <div className='w-full'>
          <div className='w-full'>
                        <div className='ml-4 mr-4'>
                            <h1 className='text-2xl font-sans font-bold '>{title}</h1>
                        </div>
                        <div className='w-full h-4'></div>
                        <div className='w-full'>
                            <div className='ml-4 mr-4'>
                                <div className='flex justify-start  overflow-auto no-scrollbar items-start'>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className='pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm'>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span className='text-sm font-sans font-medium text-gray-700'>Filter</span>
                                                <div>
                                                    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" id="filter"><path fill="#111224" d="M17 11H4A1 1 0 0 1 4 9H17A1 1 0 0 1 17 11zM26 11H22a1 1 0 0 1 0-2h4A1 1 0 0 1 26 11z"></path><path fill="#111224" d="M19.5 13.5A3.5 3.5 0 1 1 23 10 3.5 3.5 0 0 1 19.5 13.5zm0-5A1.5 1.5 0 1 0 21 10 1.5 1.5 0 0 0 19.5 8.5zM26 21H13a1 1 0 0 1 0-2H26A1 1 0 0 1 26 21zM8 21H4a1 1 0 0 1 0-2H8A1 1 0 0 1 8 21z"></path><path fill="#111224" d="M10.5,23.5A3.5,3.5,0,1,1,14,20,3.5,3.5,0,0,1,10.5,23.5Zm0-5A1.5,1.5,0,1,0,12,20,1.5,1.5,0,0,0,10.5,18.5Z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className='pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm'>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span className='text-sm font-sans font-medium text-gray-700'>Sort By</span>
                                                <div className='text-sm'>
                                                    <i className="fa-solid fa-angle-down"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className={`pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm ${filter.fastDelivery ? 'bg-gray-200' : 'bg-transparent'}`}>
                                            <div className=' w-full flex gap-2  items-center'>
                                            <span type="button" className='text-sm font-sans font-medium text-gray-700' 
                                            onClick={() => handleFilterResturant('fastDelivery')}
                                            > Fast Delivery</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className={`pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm ${filter.rating4Plus ? 'bg-gray-200' : 'bg-transparent'}`}>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span type="button" className='text-sm font-sans font-medium text-gray-700'
                                                 onClick={() => handleFilterResturant('rating4Plus')}
                                                >Ratings 4.0+</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className='pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm'>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span className='text-sm font-sans font-medium text-gray-700'>Pure Veg</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className={`pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm ${filter.offers ? 'bg-gray-200' : 'bg-transparent'}`}>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span type="button" className='text-sm font-sans font-medium text-gray-700'
                                                onClick={() => handleFilterResturant('offers')}
                                                >Offers</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className={`pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm ${filter.costForTwo ? 'bg-gray-200' : 'bg-transparent'}`}>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span type="button" className='text-sm font-sans font-medium text-gray-700'
                                                 onClick={() => handleFilterResturant('costForTwo')}
                                                >Rs. 300-Rs. 600</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mr-2 whitespace-nowrap cursor-pointer'>
                                        <div className={`pt-2 pb-2 pl-3 pr-3 border-[1px] border-gray-200 rounded-full flex items-center shadow-sm ${filter.cost ? 'bg-gray-200' : 'bg-transparent'}`}>
                                            <div className=' w-full flex gap-2  items-center'>
                                                <span  type="button" className='text-sm font-sans font-medium text-gray-700'
                                                  onClick={() => handleFilterResturant('cost')}
                                                >Less than Rs. 300</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className='mt-8 mb-8 mr-4 ml-4'>
                            <div>
                                <div className='flex  justify-center gap-8 items-center   flex-wrap'>
                                {filterResturant && filterResturant.map((resturants) => (
                                            <div key={resturants?.info?.id} className=' max-w-[330px] h-[323px] transform hover:scale-97 transition-transform duration-300'>
                                                <div>
                                                    <Link to={`/city/${resturants?.info?.id}?${resturants?.cta?.link.slice(28,)}`}>
                                                        <div className='grid justify-center gap-3 items-center overflow-hidden'>
                                                            <div className='w-[330px] h-[220px] relative shadow-md rounded-2xl'>
                                                                <img className='w-[330px] h-[220px] object-cover rounded-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resturants?.info?.cloudinaryImageId}`} alt="" />
                                                                <div style={{ background: 'linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)' }} className='w-full h-[81px] grid items-end object-cover absolute bottom-0 pl-3 pr-3 pb-2 bg-black  bg-gradient-to-b from-gray-50 to-black rounded-b-2xl bg-opacity-[0.4] '>
                                                                    <h3 className='text-white text-xl font-sans font-extrabold'>{resturants?.info?.aggregatedDiscountInfoV3?.header} {resturants?.info?.aggregatedDiscountInfoV3?.subHeader}</h3>
                                                                </div>
                                                            </div>
                                                            <div className='ml-3'>
                                                                <div>
                                                                    <h4 className='text-lg font-sans font-bold'>{resturants?.info?.name}</h4>
                                                                </div>
                                                                <div className='mt-0.5 flex items-center gap-1'>
                                                                    <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg></div>
                                                                    <div>
                                                                        <span className='text-base font-sans font-medium text-gray-700'>{resturants?.info?.avgRatingString} • </span>
                                                                        <span className='text-base font-sans font-bold'>{resturants?.info?.sla?.slaString}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='mt-0.5 grid gap-0'>
                                                                    <span className='w-full h-[19px] overflow-hidden text-sm font-sans font-medium text-gray-600'>{resturants?.info?.cuisines}</span>
                                                                    <span className='text-sm font-sans font-medium text-gray-600'>{resturants?.info?.areaName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default YourCityFood