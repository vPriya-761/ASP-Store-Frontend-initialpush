import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getUserInfo = async (auth_token) => {
  const response = await axios.get(`${ASP_API_URL}/api/customer_info`, {
    headers: {
      Authorization: auth_token,
    },
  });
  return response.data.data;
};

export const getCustomerLocations = async (auth_token, page, limit) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/get_customer_locations?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data.data;
};

export const getCountries = async (auth_token) => {
  const response = await axios.get(`${ASP_API_URL}/api/countries?limit=100`, {
    headers: {
      Authorization: auth_token,
    },
  });
  return response.data;
};

export const getProvinces = async (country_id, auth_token) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/${country_id}/provinces?limit=100`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

export const getCites = async (provinces_id, auth_token) => {
  const response = await axios.get(
    `${ASP_API_URL}/api/${provinces_id}/cities?limit=2000`,
    {
      headers: {
        Authorization: auth_token,
      },
    }
  );
  return response.data;
};

export const createLocation = async (details, token) => {
  const response = await axios.post(
    `${ASP_API_URL}/api/create_location`,
    details,
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const editLocationDetails = async (details, token, id) => {
  const response = await axios.put(
    `${ASP_API_URL}/api/update_location/${id}`,
    details,
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const updateProfile = async (details, token) => {
  const response = await axios.put(
    `${ASP_API_URL}/api/update_profile`,
    details,
    { headers: { Authorization: token } }
  );
  return response.data;
};
