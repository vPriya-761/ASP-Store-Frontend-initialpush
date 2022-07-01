import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;
export const getFrequentlyBought = async () => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
};
export const getRelatedProducts = async () => {
  const response = await axios.get("/api/related-products");
  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await axios.get(`${ASP_API_URL}/api/brand/products/${id}`);
  return response.data.data;
};

export const getBrandproductlist = async (
  id,
  page,
  limit,
  minPrice,
  maxPrice,
) => {
  const min_price = minPrice>0?`&min_price=${minPrice}`:'';
  const max_price = maxPrice>0?`&max_price=${maxPrice}`:'';
  const response = await axios.get(
    `${ASP_API_URL}/api/brand/product_parent_list?brand_slug=${id}${min_price}${max_price}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getBrandProfile = async (id) => {
  const response = await axios.get(`${ASP_API_URL}/api/brand/${id}/brand_json`);
  return response.data;
};

export const getReviews = async (id, page, limit) => {
  const response = await axios.get(`${ASP_API_URL}/api/${id}/get_reviews?page=${page}&limit=${limit}`);
  return response.data;
}