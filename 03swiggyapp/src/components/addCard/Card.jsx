import React ,{useState} from 'react'
import { toggleLogin } from '../../uitls/toggleSlice'
import { clearCard, deletetoCard } from '../../uitls/cardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function Card() {
    const cardData = useSelector((state) => state.cardSlice.cardData)
    const resInfo = useSelector((state) => state.cardSlice.food)
    const dispatch = useDispatch()

    let veg =  "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png";
    let nonVeg =  "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";
  
  

    const totalPrice = cardData.reduce((acc, curVal) => acc + curVal.price / 100 || curVal.defaultPrice / 100, 0)

  const handleDeleteCard = (i) =>{
if(cardData.length > 1){
    let newArr = [...cardData];
    newArr.splice(i , 1);
    dispatch(deletetoCard(newArr))
    toast.success("Food removed")
}else{
    handleClearCard()
    toast.success("cart is cleared")
}
  }

  const handleClearCard = () => {
  dispatch(clearCard())
  }

  const userData = useSelector((state) => state.authSlice.userData)

  const handleUserAuth = () =>{
  if(!userData){
  toast.error("login for order")
  dispatch(toggleLogin())
  return
  }else{
   toast.success("order placed succes")
  }
  }



 if(cardData.length === 0){
    return(
        <div className='w-full relative top-[80px]'>
          <div className='w-full  flex flex-col h-screen items-center justify-center bg-[#fff]'>
 <div className='w-full max-w-[271px] mx-auto flex justify-center'><img className='h-[256px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" /></div>
 <div className="mt-6 text-lg font-sans font-bold text-stone-600">Your cart is empty</div>
 <div className="mt-2 text-base font-sans font-normal text-stone-600">You can go to home page to view more restaurants</div>
 <Link to="/">
 <button className='mt-7 py-[11px] px-[20px] text-white text-base font-bold uppercase bg-[#ff5200]'>
 See restaurants near you
 </button>
 </Link>
          </div>
        </div>
    )
 }

    return (
        <div className="w-full relative top-[80px]">
        <div className="w-[95%] md:w-[800px]  mx-auto">
            <Link to={`/city/${resInfo.id}`}>
            <div className="my-10 flex gap-5">
                <img
                    className="rounded-xl w-40 aspect-square"
                    src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                        resInfo.cloudinaryImageId
                    }
                    alt=""
                />
                <div>
                    <p className="text-5xl border-b-2 border-black pb-3 ">{resInfo.name}</p>
                    <p className="mt-3 text-xl ">{resInfo.areaName}</p>
                </div>
            </div>
            </Link>
            <hr  className="my-5 border-2"/>
            <div>
                {cardData.map(
                    (
                        {
                            name,
                            defaultPrice,
                            price,
                            itemAttribute,
                            ratings: {
                                aggregatedRating: { rating, ratingCountV2 },
                            },
                            description = "",
                            imageId,
                        },
                    ) => {
           
                        return (
                            <div key={imageId} >
                                <div className="flex w-full my-5 justify-between min-h-[182px]">
                                    <div className="w-[55%] md:w-[70%]">
                                        <img
                                            className="w-5 rounded-sm"
                                            src={itemAttribute && itemAttribute.vegClassifier == "VEG" ? veg : nonVeg}
                                            alt=""
                                            srcSet=""
                                        />
                                        <h2 className="font-bold text-lg">
                                            {name}
                                        </h2>
                                        <p className="font-bold text-lg">
                                            ₹
                                            {defaultPrice / 100 ||
                                                price / 100}{" "}
                                        </p>

                                        <div className='flex gap-1 mt-2'>
                                  <span className='text-[#1FA774] text-sm'>{rating ? <i className="fa-solid fa-star"></i> : ""}</span>
                                  <p className='text-sm font-bold  text-[#1FA774]'>{rating}</p>
                                  <p className='text-sm font-bold  text-gray-600'>{ratingCountV2 ? `(${ratingCountV2})` : ""}</p>
                              </div>

                                        <div className="line-clamp-2">{description}</div>

                                        
                                    </div>
                                    <div className="w-[40%] md:w-[20%] relative h-full">
                                        <img
                                            className="rounded-xl aspect-square"
                                            src={
                                                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                                                imageId
                                            }
                                            alt=""
                                        />
                                        <button
                                            onClick={handleDeleteCard}
                                            className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-10" />
                            </div>
                        );
                    }
                )}
            </div>

            <h1 className="text-2xl">Total - <span className="font-bold">₹{totalPrice}</span></h1>
            <div className="flex justify-between">
                <button
                    onClick={handleUserAuth}
                    className="p-3 bg-green-600 rounded-lg my-7"
                >
                    Place order
                </button>
                <button
                    onClick={handleClearCard}
                    className="p-3 bg-green-600 rounded-lg my-7"
                >
                    clear cart
                </button>
            </div>
        </div>
    </div>
    )
}

export default Card