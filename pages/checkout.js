import CheckoutForm3 from "components/checkout/CheckoutForm3";
import CheckoutForm from "components/checkout/CheckoutForm";
import CheckoutSummary from "components/checkout/OrderSummaryCard";
import { Grid } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import CheckoutNavLayout from "components/layout/CheckoutNavLayout";
import {
  getCustomerLocations,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { useAppContext } from "contexts/app/AppContext";
import { useRouter } from "next/router";
import AuthorizationPage from "components/auth-page";
import { filterCartIds } from "../helper/filters";

const Checkout = (props) => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { locationsList, countryList, page, limit, showLocation, auth_token } =
    props;
  const cartList = state?.cart?.cartList;
  const { billingAddress, shippingAddress } = state?.orderStatus;
  const disable = billingAddress === null || shippingAddress === null || cartList?.length ===0;
  useEffect(() => {
    dispatch({ type: "UPDATE_CART_LIST", payload: true });
  }, []);

  useEffect(() => {
    if (cartList?.length > 0) {
      const res = filterCartIds(cartList, 1);
      dispatch({ type: "CART_ITEM_IDS", payload: res });
      const res2 = filterCartIds(cartList, 2);
      dispatch({ type: "PRODUCT_IDS", payload: res2 });
      dispatch({ type: "SUMMERY_LIST", payload: cartList });
    }
  }, [cartList]);
  return (
    <Fragment>
      <CheckoutNavLayout authToken={auth_token} >
        {auth_token ? (
          <Grid container flexWrap="wrap-reverse" spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              {showLocation ? (
                <CheckoutForm3
                  locationsList={locationsList}
                  countryList={countryList?.data}
                />
              ) : (
                <CheckoutForm countryList={countryList?.data} />
              )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <CheckoutSummary
                orderSummery={cartList}
                buttonName={"Procced To Payment"}
                disabled={disable}
                handleFunction={() => {
                  router.push("/payment");
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <AuthorizationPage />
        )}
      </CheckoutNavLayout>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const auth_token = req?.cookies?.token || null;
  const locationsList = auth_token && (await getCustomerLocations(auth_token));
  const countryList = auth_token && (await getCountries(auth_token));
  const showLocation = locationsList?.length > 0 ? true : false;
  return {
    props: {
      auth_token,
      locationsList,
      countryList,
      showLocation,
    },
  };
}
export default Checkout;
