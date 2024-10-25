import React, { useContext, useEffect, useState , withHoc } from 'react'
import { Coordinates } from '../../context/ContextApi'
import { data } from 'autoprefixer'
import Dish from '../Dish'
import SearchResturants from '../SearchResturants'

function SearchRes() {
const [popularSearch , setPopularSeach] = useState([])
const [yourSearch , setYourSearch] = useState([])
const [inputSearchData , setInputSearchData] = useState('')
const [dishesVisiable , setDishesVisiable] = useState(true)
const [dishesData , setDishesData] = useState([])
const [activeButton , setActiveButton] = useState(2)
const [searchRestu , setSearchRestu] = useState([])
const {coord : { lat , lng }} = useContext(Coordinates)



const fetchData = async() => {
const apiUrl = await fetch(`https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`)
const result = await apiUrl.json()
console.log(result.data.cards[1].card.card.imageGridCards.info);
setPopularSeach(result?.data?.cards?.[1]?.card?.card?.imageGridCards?.info)
}


const searchData = async() => {
const apiUrl = await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=18.969539&lng=72.819329&str=${inputSearchData}&trackingId=undefined&includeIMItem=true`)
const result = await apiUrl.json()
console.log(result?.data?.suggestions);
setYourSearch(result.data.suggestions)
}


const searchDishes  = async () => {
  const dishesApi  = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=18.969539&lng=72.819329&str=${inputSearchData}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`)
  const result = await dishesApi.json()
  const datas =   result?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.DISH?.cards
  setDishesData(datas)
  const data = datas.map((data) => data?.card?.card?.restaurant?.info)
  } 

const searchResturants = async () => {
const resturantsApi = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${inputSearchData}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`)
const resultData = await resturantsApi.json()
const finalData = (resultData?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
  (data) => data?.card?.card?.info);
console.log(finalData);
setSearchRestu(finalData)
}


useEffect(()=>{
  searchData()
},[inputSearchData])

useEffect(()=>{
    fetchData()
},[lng , lat])


const handleActiveButton = (buttonIndex) =>{
setActiveButton(buttonIndex)
} 

const handleSearch = (itemName) =>{
setInputSearchData(itemName)
setDishesVisiable((prev) => !prev)
 searchDishes()
 searchResturants()
}

  return (
  <div className='w-full max-w-[860px] mx-auto justify-center  h-auto '>
        <div className='w-full relative top-[80px]'>
      <div className='pt-12 bg-white fixed z-10 flex justify-center pb-2'>
     <div className='w-full max-w-[860px] mx-auto  h-auto '>
<form className='md:w-[860px] min-w-96 md:ml-0 ml-4 flex items-center   border-[1px]   border-gray-300 rounded-md h-12 mb-4 '>
     <div className='w-full pr-3'>
            <div className='w-full flex pr-3 pl-4'>
              <input  value={inputSearchData} onChange={(e) => setInputSearchData(e.target.value)} className='w-full bg-transparent text-base font-medium outline-none text-gray-600' type="text"  placeholder='Search for resturants and food' />
              <button  className='text-gray-500 text-lg'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
     </form>
     </div>
     </div>
    {inputSearchData.length <= 0 ? (
      <div className='pt-7 pl-4 relative top-24 -z-30 '>
       <div  className='w-full'>
         <div>
         <h2  className={'text-xl font-sans font-extrabold text-gray-600'}>Popular Cuisines</h2>
         </div>
    <div className='px-4 pt-3 pb-6 my-2 '>
<div className='w-full'>
<div className='flex justify-between w-full overflow-auto no-scrollbar'>
{popularSearch && popularSearch.map((items) => (
    <div key={items.id} className='mr-[10px]'>
<div className='w-[99px]'>
    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${items.imageId}`} alt="" />
</div>
</div>
))}
</div>
</div>
    </div>
       </div>
     </div>
    ):(
     <div>
      {dishesVisiable ? (
 <div className={'w-full '}>
 <div className='w-full'>
<div  className='pt-32 pb-12'>
{yourSearch.map((items , i) => (
<button key={i}  onClick={() => handleSearch(items.text)} className='w-full cursor-pointer flex items-center pr-4 py-[14px] ml-4 hover:bg-[#F2F6FC]'>
<div className='w-16'>
<img className='w-16 rounded-md' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${items.cloudinaryId}`} alt="" />
</div>
<div className='ml-[15px]'>
 <div className='text-left'>
 <span className='text-base font-normal'>{items.text}</span>
 </div>
<div className='text-left'>
<span className='text-sm font-normal  text-gray-500'>{items.subCategory}</span>
</div>
</div>
</button>
))}
</div>
 </div>
</div>
      ):(
   <div className='w-full relative top-32'>
    <div className='w-full flex items-center mb-2'>
<button onClick={() => handleActiveButton(1)} className={`px-3 py-1 mr-2 border-[1px] border-gray-300 rounded-full ` + (activeButton === 1 ?  "bg-black text-white" : "bg-white text-black")}>
<span className='text-sm font-medium'>Restaurants</span>
</button>
<button onClick={() => handleActiveButton(2)} className={'px-3 py-1 mr-2 border-[1px]  border-gray-300 rounded-full ' + (activeButton === 2 ? "bg-black text-white" : "bg-white text-black")}>
<span className='text-sm font-medium'>Dishes</span>
</button>
    </div>
   <div className='bg-[#F5F6F8] w-full px-2 py-8'>
   <div className='flex flex-wrap  justify-center gap-5 items-center'>
   {activeButton === 2 ? (
 dishesData && dishesData.map((data , i)=> <Dish key={i} data={data?.card?.card}/>)
   ):(
    searchRestu.map((data,i) => <SearchResturants data={data?.card?.card}  key={i}/>
    
    ) 
   )
  }
 </div>
   </div>
   </div>
      )
    }
     </div>
    )
  }
     
    </div>
  </div>
  )
}

export default SearchRes

