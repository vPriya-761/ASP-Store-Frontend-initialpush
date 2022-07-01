import axios from "axios";
import { useAppContext } from "contexts/app/AppContext";
const ASP_API_URL = process.env.ASP_API_URL;

// user Details
export const getUserDetails = async (token) => {
  const response = await axios.get(`${ASP_API_URL}/current_customer`,{
    headers: {
      Authorization: token,
    }});
  return response.data;
};

// user logout
export const userLogout = () => async (token) => {
        const response = await axios.post(`${ASP_API_URL}/logout`, {
            headers: { Authorization: token },
          });
     return response.data
};

export const checkUserStatus = () => async (value) =>{
    const {dispatch} = useAppContext()
    dispatch({type:'AUTH_TOKEN',payload:value})
}
