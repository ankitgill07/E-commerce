import React ,{useState , useRef, useEffect} from 'react'
import { Link } from 'react-router-dom';


function TopResturant({data = [] , title}) {
      const scrollResturantRef = useRef(null)
      const [isAtStart, setIsAtStart] = useState(false);
      const [isAtEnd, setIsAtEnd] = useState(false);
    const resturantsRight = () => {
        scrollResturantRef.current.scrollBy({ left: 670, behavior: "smooth" });
    };

    const resturantsLeft = () => {
        scrollResturantRef.current.scrollBy({ left: -670, behavior: "smooth" });
    };

    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollResturantRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    };
    useEffect(() => {
        const scrollContainer = scrollResturantRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
    
    return (
        <div className='w-full'>
            <div className='w-full'>
                <div>
                    <div className='p-4'>
                        <div className='w-full mb-4 flex justify-between items-center'>
                            <h1 className='text-2xl font-sans font-bold '>{title}</h1>
                            <div className=' hidden  md:flex gap-3'>
                        <button onClick={resturantsLeft}  disabled={isAtStart} className={`pt-[4px] pb-[4px] pl-[9px] pr-[9px] rounded-full outline-none  ${
                    isAtStart ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-black"}`  }><i className="fa-solid fa-arrow-left"></i></button>
                        <button onClick={resturantsRight} className={`bg-gray-300 pt-[4px] pb-[4px] pl-[9px] pr-[9px] rounded-full outline-none ${
                    isAtEnd ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-black"}`}><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <div ref={scrollResturantRef} className='w-full overflow-x-auto no-scrollbar overflow-y-hidden flex justify-between items-center'>
                                {data && data.map((resturants) => (
                                    <div key={resturants?.info?.id} className=' max-w-[321px] h-[298px] pr-8  transform hover:scale-97 transition-transform duration-300'>
                                        <div>
                                            <Link to={`/city/${resturants?.info?.id}?${resturants?.cta?.link.slice(28,)}`}>
                                                <div className='grid justify-center gap-3 items-center overflow-hidden'>
                                                    <div className='w-[273px] h-[182px] relative shadow-md rounded-2xl'>
                                                        <img className='w-[273px] h-[182px] object-cover rounded-2xl ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resturants?.info?.cloudinaryImageId}`} alt="" />
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
            <hr className=' border-[1px] border-gray-100 mt-8 mb-8 ml-4 mr-4' />
        </div>
    )
}

export default TopResturant