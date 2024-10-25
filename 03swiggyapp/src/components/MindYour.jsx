import React, {useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function MindYour({data = []}) {
    const [isAtStart, setIsAtStart] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const scrollContainerRef = useRef(null);
    
    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 650, behavior: "smooth" });
    };

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -650, behavior: "smooth" });
    };
    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    };
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const userData = useSelector((state) => state.authSlice.userData)
    return (
        <div className='w-full'>
            <div className='w-full p-4 '>
                <div className='w-full flex justify-between mb-4'>
                    <h1 className='text-2xl font-sans font-bold'>{userData ? userData.name : "What's"} on you mind?</h1>
                    <div className=' hidden  md:flex gap-3'>
                        <button onClick={scrollLeft}  disabled={isAtStart} className={`pt-[4px] pb-[4px] pl-[9px] pr-[9px] rounded-full outline-none  ${
                    isAtStart ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-black"}`  }><i className="fa-solid fa-arrow-left"></i></button>
                        <button onClick={scrollRight} className={`bg-gray-300 pt-[4px] pb-[4px] pl-[9px] pr-[9px] rounded-full outline-none ${
                    isAtEnd ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-black"}`}><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>

                <div className='w-full flex justify-between items-center'>
                    <div ref={scrollContainerRef} className='w-full justify-between  flex overflow-auto no-scrollbar'>
                        {data && data.map((items) => (
                            <div key={items.entityId} className='pr-6'>
                                <div>
                                    <Link>
                                        <div className='w-[144px] h-[180px]'>
                                            <img loading='lazy' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${items.imageId}`} alt="" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className=' border-[1px] border-gray-100 mt-8 mb-8 ml-4 mr-4' />
        </div>
    )
}

export default MindYour