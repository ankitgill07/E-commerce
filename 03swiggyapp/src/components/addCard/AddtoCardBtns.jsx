import React from 'react'
import { addtoCard } from '../../uitls/cardSlice'
import { useDispatch , useSelector } from 'react-redux'
import toast from "react-hot-toast"
function AddtoCardBtns({info , food , handleDiffRes}) {

  const cardData = useSelector((state) => state.cardSlice.cardData)
  const getResInfoFromLocalStore  = useSelector((state) => state.cardSlice.food)
  const dispatch = useDispatch()
  

  const handleAddToCard = () =>{
    const addCard = cardData.find((data) => data.id === info.id)
    console.log(food);
    if(!addCard){
      if( getResInfoFromLocalStore.id === food.id || getResInfoFromLocalStore.length === 0 ){
          dispatch(addtoCard({info , food}))
          toast.success("food added to the cart")
      }else{
        toast.error("different restaurant ")
          handleDiffRes()
      }
      
  }else {
    toast.error("Already added " )
  }
}


  return (
    <button
            onClick={handleAddToCard}
            className="bg-white outline-none absolute bottom-[-20px] left-1/2  -translate-x-1/2 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow">
            Add
        </button>
  )
}

export default AddtoCardBtns