import React from 'react'
import { Link } from 'react-router-dom'
function SearchResturants({
    data :{
        info,
    }
}) {

  return (
     <div key={info?.id} className=' h-auto bg-white  '>
     <div className='w-full h-auto py-5 '>
      <Link to={`/city/${info.id}`}>
        <div className='pb-2 px-4 flex items-center'>
          <div className='relative'>
           <div>
           <img className='w-[88px] h-[96px] rounded-md' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${info?.cloudinaryImageId}`} alt="" />
           </div>
 {  info.aggregatedDiscountInfoV3 &&        <div className='absolute -bottom-2 left-2'>
              <div className=' w-[72px] bg-[#fff] grid text-center rounded-[4px] shadow-lg  border-[#e3e3e3] text-[#ff5200]'>
                <span className='text-sm font-bold'>{info?.aggregatedDiscountInfoV3?.header}</span>
                <span className='text-[8px] font-medium'>• {info?.aggregatedDiscountInfoV3?.subHeader} •</span>
              </div>
           </div>}
          </div>
          <div className='pl-4 flex flex-col'>
            <h2 className='text-sm font-bold text-gray-800 w-[254px]'>{info?.name}</h2>
     <div>
     <span className='text-xs text-gray-500'><i className="fa-solid fa-star"></i></span>
     <span className='text-xs text-gray-600 pl-1 font-medium '>{info?.avgRatingString}</span>
     <span className='text-xs text-gray-600 px-1'>.</span>
     <span  className='text-xs text-gray-600 font-medium '>{info?.sla?.slaString}</span>
     <span className='text-xs text-gray-600 px-1'>.</span>
     <span className='text-xs text-gray-600 font-medium'>{info?.costForTwoMessage}</span>
     </div>
     <div>
      <span className='text-sm text-gray-400'>{info?.cuisines?.[0]}, {info?.cuisines?.[1]}, {info?.cuisines?.[2]}</span>
     </div>
          </div>
        </div>
      </Link>
     </div>
     </div>
  )
}

export default SearchResturants

