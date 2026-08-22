import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const api = axios.create({                                    //Create Axios Instance
    baseURL: import.meta.env.VITE_API_URL,                     //Automatically adds this before every endpoint
})


api.interceptors.request.use((config) => {                    //Runs before every request, like middleware, config is the request that is about to be sent
    const token = localStorage.getItem("accessToken");

    if(token){                                                //If token exists adds to every request
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;                                          //Axios then sends the request
})

api.interceptors.response.use((response) => response,         //Runs after every response, There are two callbacks : (response) => response, If request succeeds, simply return it.
    async (error)=> {                                                   //second callback, Runs when request fails
        const originalRequest = error.config;                    //Stores the failed request, originalRequest is the same request object which was sent and failed
        if(error.response?.status === 401 && !originalRequest._retry){             //if token expired, Initially originalRequest._retry does not exist, so its value is undefined.
            originalRequest._retry = true;                              //Now if refresh fails again, it won't retry forever.

            try{
                await refreshAccessToken();

                return api(originalRequest);                              //Retry same request again which was failed

            }catch(err){                                                  //if refresh api fails
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }

)

export default api;










