import { createSlice } from "@reduxjs/toolkit"

const cardSlice = createSlice({
    name: "cardSlice",
    initialState: {
        cardData:  JSON.parse(localStorage.getItem("cardData")) || [],
        food:  JSON.parse(localStorage.getItem("resInfo")) || []
    },
   reducers:{
    addtoCard: (state, action) => {
        const { info, food } = action.payload
        state.cardData = [...state.cardData, info]
        state.food = food
        localStorage.setItem("cardData", JSON.stringify(state.cardData))
        localStorage.setItem("resInfo" , JSON.stringify(food))
    },

    deletetoCard: (state, action) => {
        state.cardData = action.payload
        localStorage.setItem("cardData", JSON.stringify(action.payload))
    },

    clearCard: (state) => {
        state.cardData = []
        state.food = []
        localStorage.removeItem("cardData")
        localStorage.removeItem("resInfo")
    }
   }
})

export const { addtoCard, deletetoCard, clearCard } = cardSlice.actions
export default cardSlice.reducer