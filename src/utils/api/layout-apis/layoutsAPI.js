import axios from "axios";
const ASP_API_URL = process.env.ASP_API_URL;

export const getProductSearch = async (
  key,
  page,
  limit,
  minPrice,
  maxPrice,
  shortBy
) => {
  const pageCount = page && page ? `&page=${page}` : "";
  const pageLimit = limit && limit ? `&limit=${limit}` : "";
  const trending =
    key && key === "trending-products" ? `&is_trending=true` : "";
  const min_price = minPrice && minPrice > 0 ? `&min_price=${minPrice}` : "";
  const max_price = maxPrice && maxPrice > 0 ? `&max_price=${maxPrice}` : "";
  const sortby = shortBy ? `&field = max_price&field_value=${shortBy}` : "";
  let searchKey =
    (key && key === "new-arrivals") || key === "trending-products"
      ? ""
      : `search=${key}`;
  const url = `${ASP_API_URL}/api/brand/product_parent_list?${searchKey}${pageCount}${pageLimit}${trending}${min_price}${max_price}${sortby}`;
  const response = await axios.get(url);
  return response.data;
};
