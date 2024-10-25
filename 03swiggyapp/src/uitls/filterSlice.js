import {createSlice} from "@reduxjs/toolkit"

const filterSlice = createSlice({
name : "filterSlice",
initialState:{
filterVal: null
},
reducers : {
    setFilterVal : (state , action) => {
      state.filterVal = action.payload
    }
}
})

export const {setFilterVal} = filterSlice.actions
export default filterSlice.reducer