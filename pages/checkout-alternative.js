import CheckoutForm2 from "components/checkout/CheckoutForm2";
import CheckoutSummary2 from "components/checkout/CheckoutSummary2";
import CheckoutForm from "components/checkout/CheckoutForm";
import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import AppLayout from "components/layout/AppLayout";
import {
  getCustomerLocations,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { getProductDetails } from "utils/api/related-products/products";
import { useAppContext } from "contexts/app/AppContext";

const CheckoutAlternative = (props) => {
  const {
    locationsList,
    showLocation,
    countryList,
    productDetails,
    product_id,
    qty,
  } = props;
  const { state, dispatch } = useAppContext();
  const { buyNowProduct } = state?.orderStatus;

  useEffect(() => {
    const res = productDetails?.find((item) => item.id === product_id);
    dispatch({ type: "BUYNOW_PRODUCT", payload: { ...res, ["qty"]: qty } });
  }, []);

  return (
    <AppLayout>
      <Container
        sx={{
          my: "1.5rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            {showLocation ? (
              <CheckoutForm2 locationsList={locationsList} />
            ) : (
              <CheckoutForm countryList={countryList?.data} />
            )}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            {buyNowProduct && <CheckoutSummary2 />}
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const auth_token = req?.cookies?.token || null;
  const { product_id, qty, product_parent_id } = JSON.parse(
    context?.query?.buyNow
  );
  const locationsList = auth_token && (await getCustomerLocations(auth_token));
  const countryList = auth_token && (await getCountries(auth_token));
  const productDetails =
    auth_token && (await getProductDetails(product_parent_id));
  const showLocation = locationsList?.length > 0 ? true : false;
  return {
    props: {
      auth_token,
      locationsList,
      showLocation,
      countryList,
      productDetails,
      product_id,
      qty,
    },
  };
}

export default CheckoutAlternative;
