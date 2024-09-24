import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVICEPROVIDER_API_ENDPOINT } from "../../utils/constants";
import axios from "axios";


export const fetchAllServiceProviders = createAsyncThunk(
    'serviceProvider/fetchAllServiceProviders',
    async(_,{isRejectedWithValue})=>{
        try{
            const response = await axios.get(`${SERVICEPROVIDER_API_ENDPOINT}/getServiceProviders`,{withCredentials:true});
            return response.data.data;
        }catch(error){
            console.log(error);
            return isRejectedWithValue(error);
        }
    }
)

const serviceProvider = createSlice({
    name:'serviceProvider',
    initialState:{
        allServiceProviders:[],
        loadingServiceProviders:false,
        errorServiceProviders:false
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllServiceProviders.pending,(state)=>{
            state.loadingServiceProviders=true
            state.errorServiceProviders=false
        }
        )
        .addCase(fetchAllServiceProviders.fulfilled,(state,action)=>{
            state.allServiceProviders=action.payload;
            state.loadingServiceProviders=false
        })
        .addCase(fetchAllServiceProviders.rejected,(state)=>{
            state.errorServiceProviders=true
            state.loadingServiceProviders=false
        })
    }
})
export default serviceProvider.reducer;