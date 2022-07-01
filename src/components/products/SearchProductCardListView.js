import FlexBox from "components/FlexBox";
import ProductCard9 from "components/product-cards/ProductCard9";
import { Pagination } from "@mui/material";
import React from "react";
const SearchProductCardListView = ({productList}) => {
  return (
    <div>
      {productList?.data?.map((item, ind) => (
        <ProductCard9 key={ind} {...item} />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Pagination count={productList?.count} variant="outlined" color="primary" />
      </FlexBox>
    </div>
  );
};

export default SearchProductCardListView;
