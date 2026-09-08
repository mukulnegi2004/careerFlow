import axios from "axios";

export const refreshAccessToken = async () => {

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token");
    }

    const url = `${import.meta.env.VITE_API_URL}/auth/refresh`;

    const response = await axios.post(url, { refreshToken });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken} = response.data;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
};