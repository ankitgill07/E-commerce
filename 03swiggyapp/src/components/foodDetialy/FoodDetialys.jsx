import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CardContext , Coordinates } from '../../context/ContextApi'
import { MenuShimmer } from '../Shimmler'
import AddtoCardBtns from '../addCard/AddtoCardBtns'
import { toggleDiffRes } from '../../uitls/toggleSlice'
import { useSelector , useDispatch } from 'react-redux'
import { clearCard } from '../../uitls/cardSlice'
function FoodDetialys() {
  const { id } = useParams()
  const [food, setFood] = useState({})
  const [discount, setDiscount] = useState([])
  const [menuData , setMenuData] = useState([])
  const {coord : { lat , lng }} = useContext(Coordinates) 

  const getFoodDetaily = async () => {
    const url = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`)
    const respon = await url.json()

    const resInfo = respon?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("food.v2.Restaurant")
    )?.card?.card?.info

    const discountInfo = respon?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("v2.GridWidget")
    )?.card?.card?.gridElements?.infoWithStyle?.offers;
  
    let actualMenu = respon?.data?.cards.find((data) => data?.groupedCard);

    setFood(resInfo)

    setDiscount(discountInfo)

    console.log(       actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (data) =>
          data?.card?.card?.itemCards || data?.card?.card?.categories
  )
)
setMenuData(actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
(data) => data?.card?.card?.itemCards || data?.card?.card?.categories))


}




  useEffect(() => {
    getFoodDetaily()
  }, [id])

  const discountSection = useRef(null)

  const scrollRight = () => {
    discountSection.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  const scrollLeft = () => {
    discountSection.current.scrollBy({ left: -350, behavior: "smooth" });
  };
   

  let veg =  "https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png";
  let nonVeg =  "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";


  return (

    <div className='w-full text-black relative top-24'>
      <div>
        <div className='w-full max-w-[800px] mx-auto mt-4 mb-4 h-auto'>
          <div className='w-full'>

           {menuData.length ? (
        <div>
          <div className='w-full'>
              <div className='w-full h-[50px]'>
                <div className='w-full flex gap-1'>
                  <div>
                    <Link to="/">
                      <span className='text-xs font-sans font-light text-gray-600'>Home  /</span>
                    </Link>
                  </div>

                  <div>
                    <Link to="/">
                      <span className='text-xs font-sans font-light text-gray-600'> {food?.city} /</span>
                    </Link>
                  </div>
                  <div>
                    <span className='text-xs font-sans font-light text-black'> {food?.name}</span>
                  </div>
                </div>
              </div>

              <div className='ml-4 mb-2 w-full'>
                <h1 className='text-2xl font-sans font-bold mt-4 mb-4 will-change-contents'>{food?.name}</h1>
              </div>

              <div className='w-full'>
                <div style={{ background: 'linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)' }} className='pl-4  pr-4 pb-4 rounded-b-[36px] '>
                  <div className='w-full h-[144px]'>
                    <div className='border-[1px] rounded-[20px]  h-auto bg-white'>
                      <div className='mb-5'></div>
                      <div className='ml-4 mr-4 flex gap-2 items-center'>
                        <div className='flex gap-1 items-center'>
                          <div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                          </div>
                          <div className='flex gap-[2px]'>
                            <span className='text-base font-sans font-bold'>{food?.avgRatingString}</span>
                            <span className='text-base font-sans font-bold'>({food?.totalRatingsString})</span>
                          </div>
                        </div>
                        <div className='text-base text-gray-400'>•</div>
                        <div className='text-base font-sans font-bold'>
                          {food?.costForTwoMessage}
                        </div>
                      </div>
                      <div className='mt-2 mb-2 ml-5 mr-5 flex items-center gap-1'>
                        <div className='text-sm font-sans font-bold text-[#ff5200] underline'>
                          {food?.cuisines?.[0]},
                        </div>
                        <div className='text-sm font-sans font-bold text-[#ff5200] underline'>
                          {food?.cuisines?.[1]}
                        </div>
                      </div>
                      <div className='ml-5 mr-5 pt-1 pb-1 flex items-center'>
                        <div className='flex flex-col items-center'>
                          <div className='w-[7px] h-[7px] rounded-full bg-[#C4C4C4]'></div>
                          <div className='w-[1px] h-[23px] bg-[#C4C4C4]'></div>
                          <div className='w-[7px] h-[7px] rounded-full bg-[#C4C4C4]'></div>
                        </div>
                        <div className='w-full ml-3 pr-4'>
                          <div className='flex justify-start items-center'>
                            <h4 className='text-sm font-sans font-bold '>Outlet</h4>
                            <span className='text-sm font-sans block ml-3 font-medium text-gray-600'>{food?.areaName}</span>
                          </div>
                          <div className='mt-2'>
                            <span className='text-sm font-sans font-bold'>{ }40-45 mins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className='m-4 cursor-pointer relative'>
              <div className='w-full '>
                <div className='w-full mt-4 mb-4 flex justify-between'>
                  <h2 className='text-xl font-sans font-bold'>Deal for your</h2>
                  <div className=' hidden  md:flex gap-3'>
                    <button onClick={scrollLeft} className={`bg-gray-200 pt-[4px] pb-[4px] pl-[9px] pr-[9px] rounded-full outline-none text-gray-400`}><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={scrollRight} className='bg-gray-300 pt-[4px] pb-[4px] pl-[9px] pr-[9px] rounded-full outline-none'><i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
                <div className='w-full flex '>
                  <div ref={discountSection} className='w-full flex justify-between overflow-auto no-scrollbar'>
                    {discount && discount.map((items, index) => (
                      <div key={index} className='pr-4'>
                        <div className='relative w-[328px]'>
                          <div className='p-3 border-[1px] rounded-[20px]'>
                            <div className='flex'>
                              <div className='h-12'>
                                <img className='h-12' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${items?.info?.offerLogo}`} alt="" />
                              </div>
                              <div className='ml-3 grid gap-1'>
                                <div className="text-xl font-sans font-bold">{items?.info?.header}</div>
                                <div className="text-sm text-gray-400 font-sans font-bold line-clamp-1 max-w-[240px]">{items?.info?.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-8 pb-4 flex justify-center items-center'>
              <span className='text-base text-gray-600 font-sans font-semibold '>MENU</span>
            </div>
            <div className="w-full  mt-2 px-4  relative cursor-pointer">
              <div className="w-full p-3 rounded-xl font-semibold text-lg bg-slate-200 text-center ">Search for dishes</div>
              <i className="fa-solid fa-magnifying-glass absolute top-4 text-gray-500 right-8"></i>
            </div>
            <div className='m-5 flex gap-1'>
              <div className='mr-2'>
                <div className='px-4 py-2 border-[1px] flex gap-3  rounded-full'>
                  <input type="checkbox" />
                  <span className='text-sm font-sans font-bold text-[#1BA672]'>Veg</span>
                </div>
              </div>
              <div className='mr-2'>
                <div className='px-4 py-2 border-[1px] flex gap-3  rounded-full'>
                  <input type="checkbox" />
                  <span className='text-sm font-sans font-bold text-[#E53554]'>Non Veg</span>
                </div>
              </div>
              <div className='mr-2'>
                <div className='px-4 py-2 border-[1px] flex gap-3 cursor-pointer rounded-full'>
                  <span className='text-sm font-sans font-semibold text-gray-600'>Bestseller</span>
                </div>
              </div>
            </div>
            <div className='h-[0.5px]  bg-gray-300 my-6 mx-4'></div>
            <div>
        </div>
        <div>
                        {menuData.map(({ card: { card } } , i) => (
                            <MenuCard card={card} key={i} food={food} />
                        ))}
                    </div>
        </div>
           ) : (
            <div>
        <MenuShimmer />
            </div>
           )
          }
            
           
                       
        </div>
          </div>
        </div>
      </div>
   
  )
function MenuCard({card , food})  {
let hello = false
if (card["@type"]) {
  hello = true;
}
const [isOpen, setIsOpen] = useState(hello)

const toggleButton = () => {
setIsOpen((prev) => !prev)
}
if(card.itemCards){
  const {title , itemCards} = card
  return(
    <div>
 <div className='my-6 mx-4'>
                <div>
                  <button onClick={toggleButton} className='w-full flex justify-between items-center pr-4 mb-6'>
                    <h3 className={' font-sans font-bold  text-xl' + (card["@type"] ? "xl" : "base")}>{title} ({title.length})</h3>
                    <div className='text-sm font-sans font-medium'>
                      <i className={"fa-solid fa-angle-" + (isOpen ? "up" : "down")}></i>
                    </div>
                  </button>
                  {isOpen && (
                        <DetailMenu itemCards={itemCards} food={food} />
                    )}
                </div>
            </div> 
          <div className='w-full h-4 bg-gray-100'></div>
    </div>
  )
}else{
const {title , categories} = card
return(
  <div className='my-6 mx-4'>
    <h1 className="font-bold text-xl">{title}</h1>
                {categories.map((data, i) => (
                    <MenuCard key={i} card={data} food={food} />
                ))}
  </div>
)
}

}
function DetailMenu  ({itemCards , food}) {
  return(
    
<div>
{itemCards.map(({ card: { info } }) => (
                <DetailMenuCard key={info.id} info={info} food={food} />
            ))}
    
</div>

  )
function DetailMenuCard ({info , food}) {
  const {
    name,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
        aggregatedRating: { rating, ratingCountV2 },
    },
    isBestseller,
    description = "",
    imageId,
} = info;





const diffRes = useSelector((state) => state.togglSlice.isDiffRes)
const dispatch = useDispatch()

const handleDiffRes = () => {
dispatch(toggleDiffRes())
}

function handleClearCard () {
dispatch(clearCard())
handleDiffRes()
}


const [isMore, setIsMore] = useState(false);



let trimDes = description.substring(0, 138) + "...";
return(
   <div className='w-full'>
                    <div className='py-1'>
                      <div className=' relative w-full'>
                         <div className='flex justify-between min-h-[182px]'>
                              <div className='w-[55%] md:w-[70%]'>
                              <div className='flex gap-2 '>
                              <img className='w-5 rounded-sm' src={itemAttribute && itemAttribute.vegClassifier == "VEG" ? veg : nonVeg} alt="" />
                              <span className='text-sm font-semibold text-[#ee5338]'>{isBestseller == true ? "Bestseller" : ""}</span>
                              </div>
                              <h2 className='font-bold text-lg text-gray-700'>{name}</h2>
                              <p className='text-base font-bold'>₹{defaultPrice / 100 || price / 100}{""}</p>
                              <div className='flex gap-1 mt-2'>
                                  <span className='text-[#1FA774] text-sm'>{rating ? <i className="fa-solid fa-star"></i> : ""}</span>
                                  <p className='text-sm font-bold  text-[#1FA774]'>{rating}</p>
                                  <p className='text-sm font-bold  text-gray-600'>{ratingCountV2 ? `(${ratingCountV2})` : ""}</p>
                              </div>
                              <div className='mt-2'>
                                  <span className='text-base font-normal text-gray-600  line-clamp-2 md:line-clamp-none '>{isMore ? description : trimDes}</span>
                                  <button  onClick={() => setIsMore(!isMore)} className='hidden md:block font-bold'>{isMore ? "less" : "more"}</button>
                              </div>
                              </div>
                              <div className='w-[40%] md:w-[20%] relative h-full'>
                               <img className='rounded-xl aspect-square' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" />
                             <AddtoCardBtns 
                              info={info} food={food} handleDiffRes={handleDiffRes} />
                              </div>
                         </div>
                      </div>
                      <div className='w-full my-5 h-[0.5px] bg-gray-300'></div>
                    </div>
                    {diffRes && (
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
            )}
                  </div> 


)
}
}
}

export default FoodDetialys