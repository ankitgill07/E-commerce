import {createSlice} from "@reduxjs/toolkit"

const togglSlice = createSlice({
name : "toggleSlice",
initialState:{
sreachBarToggle : false,
loginToggle :false,
isDiffRes: false,
simlerRes: {
    isSimilarResDishes : false,
    city : "",
    resLocation : "",
    resId : "",
    itemId : ""
}
},
reducers:{
    toggleSreachBar : (state) => {
        state.sreachBarToggle = !state.sreachBarToggle
    },
    toggleLogin : (state) => {
    state.loginToggle = !state.loginToggle
    },
     toggleDiffRes : (state) => {
    state.isDiffRes = !state.isDiffRes
     },
     setSimlerRes : (state , action) => {
        state.simlerRes = action.payload
     },
     resetSimlerRest : (state) => {
        state.isSimilarResDishes = {
            isSimilarResDishes : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : ""
        }
     }

}
}) 

export const {toggleSreachBar , toggleLogin , toggleDiffRes , setSimlerRes , resetSimlerRest} = togglSlice.actions
export default togglSlice.reducer