import { configureStore } from "@reduxjs/toolkit"
import  togglSlice from "../uitls/toggleSlice"
import authSlice from "../uitls/authSlice"
import cardSlice from "../uitls/cardSlice"
const Store = configureStore({
reducer : {
    togglSlice,
    authSlice,
    cardSlice,
}
})

export default Store