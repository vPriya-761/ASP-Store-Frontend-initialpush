import CheckoutNavLayout from "components/layout/CheckoutNavLayout";
import PaymentForm from "components/payment/PaymentForm";
import PaymentSummary from "components/payment/PaymentSummary";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppContext } from "contexts/app/AppContext";
import { getshippingCharge } from "utils/api/orders-api/ordersAPI";
import AuthorizationPage from "components/auth-page";

const Checkout = () => {
  const { state, dispatch } = useAppContext();
  const { authToken } = state?.authToken;
  const { shippingAddress, productIds } = state?.orderStatus;

  useEffect(() => {
    if (productIds?.length > 0 && shippingAddress) {
      const details = {
        product_details: productIds,
        shipping_id: shippingAddress,
      };
      const res = getshippingCharge(details, authToken);
      res
        .then((data) => {
          if (data) {
            dispatch({ type: "SHIPPING_CHARGE", payload: data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <CheckoutNavLayout authToken={authToken}>
      {authToken ? (
        <Grid container flexWrap="wrap-reverse" spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <PaymentForm />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <PaymentSummary />
          </Grid>
        </Grid>
      ) : (
        <AuthorizationPage />
      )}
    </CheckoutNavLayout>
  );
};

export default Checkout;
