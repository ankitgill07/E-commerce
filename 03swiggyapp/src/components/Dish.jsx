import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import AddtoCardBtns from './addCard/AddtoCardBtns'
import { setSimlerRes, toggleDiffRes } from '../uitls/toggleSlice'
import { clearCard } from '../uitls/cardSlice'
import { Link } from 'react-router-dom'

function Dish({
    data: {
        info,
        restaurant
    }
}) {

    let veg = "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png";
    let nonVeg = "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

    const food  = restaurant?.info
    
    const isDiffRes = useSelector((state) => state.togglSlice.isDiffRes)
    const { id: cartResId } = useSelector((state) => state.cardSlice.food);
    const dispatch = useDispatch()
    const handleDiffRes = () => {
        dispatch(toggleDiffRes())
    }
    const handleClearCard = () => {
        dispatch(clearCard())
        handleDiffRes()
    }
   const handleSameRes = () =>{
if (cartResId !== food.id) {
    console.log(food);
}
   }
    return (
        <>
        {info  ? (
 <div className='h-auto pb-6 bg-white rounded-[24px]'>
 <div className='w-full '>
     <div className='pt-[22px] pb-2 px-4  h-auto'>
         <Link to={`/city/${food?.id}`}>
             <div className='w-full flex justify-between items-center'>
                 <div>
                     <h3 className='text-sm font-bold text-gray-500'>{food?.name}</h3>
                     <span className='text-xs text-gray-500'><i className="fa-solid fa-star"></i></span>
                     <span className='text-xs text-gray-400 pl-1 '>{food?.avgRating}</span>
                     <span className='text-xs text-gray-400 px-1'>.</span>
                     <span className='text-xs text-gray-400  '>{food?.sla?.slaString }</span>
                 </div>
                 <div>
                     <span><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M13.2307 5.53999C12.9769 5.28615 12.5653 5.28615 12.3115 5.53999C12.0576 5.79383 12.0576 6.20539 12.3115 6.45923L17.2019 11.3496L5.39414 11.3496C5.03516 11.3496 4.74414 11.6406 4.74414 11.9996C4.74414 12.3586 5.03516 12.6496 5.39414 12.6496L17.2019 12.6496L12.3115 17.54C12.0576 17.7938 12.0576 18.2054 12.3115 18.4592C12.5653 18.7131 12.9769 18.7131 13.2307 18.4592L18.949 12.741C19.3584 12.3315 19.3584 11.6677 18.949 11.2583L13.2307 5.53999Z" fill="#868891"></path></svg></span>
                 </div>
             </div>
         </Link>
         <div className='w-full mt-4  mb-5 border-[1px] border-dotted' ></div>
<div key={info?.id} className='w-full py-1'>
             <div className='flex justify-between'>
                 <div>
                     <div className='w-4 mb-1'>      {info.isVeg == 1 ? (
                     <img src={veg} alt="" />
                 ) : (
                     <img src={nonVeg} alt="" />
                 )}</div>
                     <h1 className='text-lg font-bold w-[220px]'>{info?.name}</h1>
                     <div className='mt-1'>
                         <span className='mr-1 text-base font-bold'>
                             ₹{info?.price / 100}
                         </span>
                     </div>
                     <button className='mt-3 flex justify-center items-center py-1 px-2 border-[1px] border-gray-300 rounded-full'>
                         <div className='text-sm font-medium text-gray-600'>More Details</div>
                         <div className='ml-1 mb-[1px]'>
                             <span className='text-xs text-gray-600'><i className="fa-solid fa-angle-right"></i></span>
                         </div>
                     </button>
                 </div>
                 <div className='relative ml-[px]'>
                     <button className='w-[156px] h-[144px]'>
                         {info.imageId ? 
                          <img className='rounded-[12px] w-[156px] h-[144px] object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`} alt="" srcSet="" />
                          :
                          "" 
                        }
                     </button>
                     <div onClick={handleSameRes}>
                         <AddtoCardBtns info={info} food={food} handleDiffRes={handleDiffRes}/>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
</div>
        ) :(
            
            <div>
                {isDiffRes && 
                 <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
                 <h1>Items already in cart</h1>
                 <p>
                     Your cart contains items from other restaurant. Would
                     you like to reset your cart for adding items from this
                     restaurant?
                 </p>
                 <div className="flex justify-between gap-3 w-full uppercase">
                     <button
                         onClick={handleDiffRes}
                         className="border-2 w-1/2 p-3 border-green-600 text-green-600"
                     >
                         No
                     </button>
                     <button
                         onClick={handleClearCard}
                         className="  w-1/2 p-3 bg-green-600 text-white "
                     >
                         Yes, start Afresh
                     </button>
                 </div>
             </div>
                }
            </div>

        )
        
        }

        </>

    )
}

export default Dish