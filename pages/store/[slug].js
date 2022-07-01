import NavbarLayout from "components/layout/NavbarLayout";
import StoreProductCard from "components/products/StoreProductCard";
import ProductFilterCard from "components/products/ProductFilterCard";
import ShopIntroCard from "components/shop/ShopIntroCard";
import Sidenav from "components/sidenav/Sidenav";
import useWindowSize from "hooks/useWindowSize";
import FilterList from "@mui/icons-material/FilterList";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  getBrandproductlist,
  getBrandProfile,
} from "utils/api/related-products/products";
import FlexBox from "components/FlexBox";
import CustomPagination from "components/pagination/CustomPagination";
import { useAppContext } from "contexts/app/AppContext";
import { useRouter } from "next/router";
const Shop = (props) => {
  const width = useWindowSize();
  const isTablet = width < 1025;
  const { productList, brandProfile, page, limit, slug } = props;
  const { dispatch } = useAppContext();
  const [brandProductList, setBrandProductList] = useState(productList?.data);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  useEffect(() => {
    dispatch({ type: "UPDATE_CART_LIST", payload: true });
  }, []);

  const updateBrandProductList = useCallback(() => {
    const res = getBrandproductlist(slug, page, limit, minPrice, maxPrice);
    res
      .then((data) => {
        if (data.data) {
          setBrandProductList(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maxPrice, minPrice, slug, page, limit, productList]);

  useEffect(() => {
    updateBrandProductList();
  }, [maxPrice, minPrice, slug, page, limit, productList]);

  return (
    <NavbarLayout>
      <ShopIntroCard brandinfo={brandProfile?.data} />
      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          xs={12}
          sx={{
            "@media only screen and (max-width: 1024px)": {
              display: "none",
            },
          }}
        >
          <ProductFilterCard
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        </Grid>

        <Grid item md={9} xs={12}>
          {isTablet && (
            <Sidenav
              position="left"
              handle={
                <IconButton
                  sx={{
                    marginLeft: "auto",
                    display: "block",
                  }}
                >
                  <FilterList fontSize="small" />
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
          {brandProductList?.length > 0 && (
            <StoreProductCard productList={brandProductList} />
          )}
        </Grid>
      </Grid>
      <FlexBox
        flexWrap="wrap"
        justifyContent="flex-end"
        alignItems="center"
        mt={4}
      >
        <CustomPagination
          page={page}
          count={productList?.count}
          limit={limit}
        />
      </FlexBox>
    </NavbarLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  let minPrice = 0;
  let maxPrice = 0;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 40;
  const productList = await getBrandproductlist(
    slug,
    page,
    limit,
    minPrice,
    maxPrice
  );
  const brandProfile = await getBrandProfile(slug);
  return {
    props: {
      productList,
      brandProfile,
      page,
      limit,
      slug,
    },
  };
}
export default Shop;
