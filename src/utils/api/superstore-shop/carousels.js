import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getMainCarousel = async () => {
  const response = await axios.get("/api/super-store/main-carousel");
  return response.data;
};
export const getFlashDeals = async () => {
  const response = await axios.get("/api/super-store/flash-deals");
  return response.data;
};
export const getTopCategories = async () => {
  const response = await axios.get("/api/super-store/top-categories");
  return response.data;
};
export const getBigDiscountList = async () => {
  const response = await axios.get("/api/super-store/big-discounts");
  return response.data;
};

export const getUserDetails = async (auth_token) => {
  const response = await axios.get(`${ASP_API_URL}/api/current_customer`,{
    headers: {
      Authorization: auth_token,
    }});
  return response.data;
};

export const getCategories2 = async () =>{
  const response = await axios.get(`${ASP_API_URL}/api/brand/categories`)
  if(response.data) return response.data;
}