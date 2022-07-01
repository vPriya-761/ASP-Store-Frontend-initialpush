import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getOrders = async (auth_token, page, limit) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/orders_list?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

export const getOrderStatuses = async (auth_token) => {
  const response = await axios.get(`${ASP_API_URL}/api/order_statuses`, {
    headers: {
      Authorization: auth_token,
    },
  });
  return response.data.data;
};

export const getOrderDetails = async (orderId, auth_token) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/order_details/${orderId}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data.data;
};

export const createOrder = async (details, auth_token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/process_order`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};

export const getshippingCharge = async (details, auth_token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/shipping_charge_session`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};

// strip API

export const stripOrderCreation = async (details, auth_token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/stripe/checkout_session`,
    details,
    { headers: { Authorization: auth_token } }
  );
  return response.data;
};
