import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { SESSION_API_ENDPOINT } from "../../utils/constants";
import axios from "axios";

export const fetchAllSessions = createAsyncThunk(
    'sessions/fetchAllSessions', 
    async(_,{isRejectedWithValue})=>{
        try{
            console.log("Debug");
            const response =await axios.get(`${SESSION_API_ENDPOINT}/getSessions`,{withCredentials: true,});
            return response.data.data;
        }catch(error){
            console.log(error)
            return isRejectedWithValue(error)
        }
    }
)

export const fetchUserSessions = createAsyncThunk(
    'sessions/fetchUserSessions',
    async(id,{isRejectedWithValue})=>{
        try{
            const response = await axios.get(`${SESSION_API_ENDPOINT}/getSessionByUser/${id}`,{withCredentials:true});
            // console.log("Debugger1")
            return response.data.data;
            console.log(response);
        }catch(error){
            console.log(error);
            return isRejectedWithValue(error)
        }
    }
)

const sessionSlice = createSlice({
    name:'session',
    initialState:{
        allSessions:[],
        userSessions:[],
        loadingAllSessions:false,
        errorAllSessions: false,
        loadingUserSession: false,
        errorUserSession: false
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllSessions.pending,(state)=>{
            state.loadingAllSessions=true;
            state.errorAllSessions=false;
        })
        .addCase(fetchAllSessions.fulfilled,(state,action)=>{
            state.allSessions=action.payload;
            state.loadingAllSessions=false;
        })
        .addCase(fetchAllSessions.rejected,(state)=>{
            state.errorAllSessions=true;
        })
        .addCase(fetchUserSessions.pending,(state)=>{
            state.loadingUserSession=false;
            state.errorUserSession=false;
        })
        .addCase(fetchUserSessions.fulfilled,(state,action)=>{
            state.userSessions=action.payload
        })
        .addCase(fetchUserSessions.rejected,(state)=>{
            state.errorUserSession=true
        })
    }
});

export default sessionSlice.reducer;