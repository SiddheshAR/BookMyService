import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { SESSION_API_ENDPOINT } from "../../utils/constants";
import axios from "axios";


export const fetchAssignedServices = createAsyncThunk(
    'serviceProvider/fetchAssignedServices',
    async(_,{isRejectedWithValue})=>{
        try{
            console.log("Debug 1");

            const resp = await axios.get(`${SESSION_API_ENDPOINT}/getServiceProvider`,{
                withCredentials:true
            })
            return resp.data.data
        }catch(error){
            console.log(error);
            return isRejectedWithValue(error)
        }
    }
)

const AssignedServices = createSlice({
    name:'assignProvider',
    initialState:{
        assignedServices:[],
        loadingAssignedServices:false,
        errorLoadAssignedServices:false
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAssignedServices.pending,(state)=>{
            state.loadingAssignedServices=true;
            state.errorLoadAssignedServices=false
        }).addCase(fetchAssignedServices.fulfilled,(state,action)=>{
            state.loadingAssignedServices=false;
            state.assignedServices=action.payload;
            state.errorLoadAssignedServices=false
        }).addCase(fetchAssignedServices.rejected,(state)=>{
            state.loadingAssignedServices=false;
            state.errorLoadAssignedServices=true;
        })
    }
})


export default AssignedServices.reducer;

