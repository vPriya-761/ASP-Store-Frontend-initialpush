import StoreProducts from "components/product-cards/StoreProducts";
import { Grid } from "@mui/material";
import React from "react";

const StoreProductCard = ({ productList }) => {
  return (
    <div>
      <Grid container spacing={3}>
        {productList?.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            {item?.profile_photo && <StoreProducts {...item} />}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StoreProductCard;
