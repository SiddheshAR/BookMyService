import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:{
            address:"",
            email:"",
            fullname:"",
            phoneNumber:0,
            role:"",
            _id:""
        }
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        }
    }
})

export const {setLoading,setUser} = authSlice.actions;
export default authSlice.reducer;