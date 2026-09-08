import {createAsyncThunk} from "@reduxjs/toolkit";

import { getFeed } from "../../services/feed.service";


const fetchAllFeed = createAsyncThunk(
    "feed/fetchAllFeed",
    async({page = 1, limit = 5} = {}, {rejectWithValue}) => {
        try{
            const response = await getFeed(page, limit);

            return {
                feed: response.data.feed,
                page,
                limit
            }
        }catch(err){
            return rejectWithValue(
                err.response?.data?.message || "failed to fetch feed"
            );
        }
    }
);

export {fetchAllFeed};



