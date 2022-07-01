import { getCookie, removeCookies, setCookies } from "cookies-next";
import { uid } from "../../../../helper/randomId";
import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;
const sessionId = getCookie("sessionId");

export const getCartList = async (auth_token, page, limit) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/show_cart?guest_user=0&limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

export const addToCart = async (details) => {
  const auth_token = getCookie("token");
  if (auth_token)
    try {
      const response = await axios.post(
        `${ASP_API_URL}/api/add_to_cart`,
        details,
        { headers: { Authorization: auth_token } }
      );
      return response.data;
    } catch (error) {
      return error;
    }
};

export const removeCart = async (id) => {
  const auth_token = getCookie("token");
  if (auth_token)
    try {
      const response = await axios.put(
        `${ASP_API_URL}/api/remove_from_cart?id=${id}`,
        {},
        {
          headers: {
            Authorization: auth_token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
};

export const updateCartItem = async (id, type) => {
  const types = type === true ? "add" : "reduce";
  const auth_token = getCookie("token");
  if (auth_token)
    try {
      const response = await axios.put(
        `${ASP_API_URL}/api/update_cart/${id}?type=${types}`,
        {},
        {
          headers: {
            Authorization: auth_token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
};

export const assignCartToCustomer = async (session_id,auth_token) =>{

  if (auth_token)
    try {
      const response = await axios.put(
        `${ASP_API_URL}/api/assign_cart_to_customer/${session_id}`,
        {},
        {
          headers: {
            Authorization: auth_token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
}



// without session cart APIS
export const sessionGetCartList = async (session_id,page, limit) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/guest/show_cart?session_id=${session_id}&limit=${limit}&page=${page}`
  );
  return response.data;
};

export const sessionAddToCart = async (details) => {
    try {
      const response = await axios.post(
        `${ASP_API_URL}/api/guest/add_to_cart`,
        details
      );
      return response.data;
    } catch (error) {
      return error;
    }
};

export const sessionRemoveCart = async (id) => {
  if (sessionId)
    try {
      const response = await axios.put(
        `${ASP_API_URL}/api/guest/remove_from_cart`,
        {
          session_id: sessionId,
          id: id,
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
};

export const sessionUpdateCartItem = async (id, type) => {
  const types = type === true ? "add" : "reduce";
  const auth_token = getCookie("token");
  if (auth_token)
    try {
      const response = await axios.put(
        `${ASP_API_URL}/api/update_cart/${id}?type=${types}`,
        {},
        {
          headers: {
            Authorization: auth_token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
};

export const removeCartItems = async () => {
  // removeCookies("cartItems");
};

export const setCartItems = async (items) => {
  setCookies("cartItems", items);
};

export const saveCartItems = async (items) => {
  console.log("savecarts", items);
  // const cartValues = JSON.parse(items);
  // removeCookies("cartItems");
};
