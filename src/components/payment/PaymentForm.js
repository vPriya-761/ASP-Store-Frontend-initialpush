import Card1 from "components/Card1";
import useWindowSize from "hooks/useWindowSize";
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import {
  createOrder,
  stripOrderCreation,
} from "utils/api/orders-api/ordersAPI";
import { useAppContext } from "contexts/app/AppContext";
import { Small } from "components/Typography";

const PaymentForm = ({ orderType }) => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentTitle, setPaymentTitile] = useState();
  const width = useWindowSize();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { authToken } = state?.authToken;
  const {
    billingAddress,
    shippingAddress,
    cartItemIds,
    shippingCharge,
    buyNowProduct,
  } = state?.orderStatus;
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);

    if (name === "stripe") {
      setPaymentTitile("Credit Card/Debit Card");
    } else {
      setPaymentTitile("Cash on delivery");
    }

    dispatch({ type: "PAYMENT_METHOD", payload: paymentMethod });
  };

  const orderCreation = () => {
    const type =
      orderType === "buy-now" ? 1 : cartItemIds?.length === 0 ? 3 : 2;
    const orderDetails = {
      order_type: type,
      billing_id: billingAddress,
      shipping_id: shippingAddress,
      payment_method: paymentMethod,
      payment_method_title: paymentTitle,
      shipping_charge_id: shippingCharge?.shipping_id,
    };
    if (orderType === "buy-now") {
      orderDetails = { ...orderDetails, ["product_id"]: buyNowProduct?.id };
      orderDetails = { ...orderDetails, ["quantity"]: buyNowProduct?.qty };
    } else {
      orderDetails = { ...orderDetails, ["cart_item_ids"]: cartItemIds };
    }
    if (paymentMethod === "stripe") {
      cardsMethod(orderDetails);
    }
    if (paymentMethod === "cod") {
      codMethod(orderDetails);
    }
  };

  const codMethod = (orderDetails) => {
    const res = createOrder(orderDetails, authToken);
    res
      .then((data) => {
        if (data.msg === "Order Created Successfully") {
          dispatch({ type: "SUMMERY_LIST", payload: [] });
          dispatch({ type: "CART_ITEM_IDS", payload: [] });
          dispatch({ type: "PRODUCT_IDS", payload: [] });
          dispatch({ type: "SHIPPING_ID", payload: null });
          dispatch({ type: "BILLING_ID", payload: null });
          dispatch({ type: "PAYMENT_METHOD", payload: null });
          dispatch({ type: "SHIPPING_CHARGE", payload: null });
          router.push({
            pathname: "/orders/orders-status",
            query: { status: 200, msg: "success" },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        router.push({
          pathname: "/orders/orders-status",
          query: { status: 200, msg: "cancel" },
        });
      });
  };

  const cardsMethod = (orderDetails) => {
    const res = stripOrderCreation(orderDetails, authToken);
    res
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: "SUMMERY_LIST", payload: [] });
          dispatch({ type: "CART_ITEM_IDS", payload: [] });
          dispatch({ type: "PRODUCT_IDS", payload: [] });
          dispatch({ type: "SHIPPING_ID", payload: null });
          dispatch({ type: "BILLING_ID", payload: null });
          dispatch({ type: "PAYMENT_METHOD", payload: null });
          dispatch({ type: "SHIPPING_CHARGE", payload: null });
          router.push(data.url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <Small
        fontWeight="600"
        fontSize="15px"
        color="grey.600"
        display="block"
        mb={2.5}
      >
        Choose Payment Mode
      </Small>
      <Card1
        sx={{
          mb: "2rem",
        }}
      >
        <FormControlLabel
          name="stripe"
          label={
            <Typography fontWeight="600">
              Pay with credit / debit card
            </Typography>
          }
          control={
            <Radio
              checked={paymentMethod === "stripe"}
              color="secondary"
              size="small"
            />
          }
          sx={{
            mb: "1.5rem",
          }}
          onChange={handlePaymentMethodChange}
        />

        <Divider
          sx={{
            mb: "1.25rem",
            mx: "-2rem",
          }}
        />
        <FormControlLabel
          name="cod"
          label={<Typography fontWeight="600">Cash On Delivery</Typography>}
          control={
            <Radio
              checked={paymentMethod === "cod"}
              color="secondary"
              size="small"
            />
          }
          onChange={handlePaymentMethodChange}
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={orderCreation}
            disabled={paymentMethod === null || paymentMethod === undefined}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PaymentForm;
