import FlexBox from "components/FlexBox";
import ProductCard7 from "components/product-cards/ProductCard7";
import { Span } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";
import CheckoutNavLayout from "components/layout/CheckoutNavLayout";
import { Button, Card, Divider, Grid } from "@mui/material";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  getCartList,
  sessionGetCartList,
} from "utils/api/checkout-apis/checkoutAPI";
import { filterCartIds } from "../helper/filters";
import EmptyCart from "../src/components/product-cards/EmptyCart";

const Cart = (props) => {
  const { cartListItem } = props;
  const { state, dispatch } = useAppContext();
  const { cartItemIds } = state?.orderStatus;
  // const { orderSummery } = state?.summary;
  const cartList = state?.cart?.cartList;
  const { authToken } = state?.authToken;

  useEffect(() => {
    dispatch({
      type: "CART_LIST",
      payload: cartListItem?.cart_items,
    });
  }, [cartListItem]);

  useEffect(() => {
    if (cartList?.length > 0) {
      const res = filterCartIds(cartList, 1);
      dispatch({ type: "CART_ITEM_IDS", payload: res });
      const res2 = filterCartIds(cartList, 2);
      dispatch({ type: "PRODUCT_IDS", payload: res2 });
      dispatch({ type: "SUMMERY_LIST", payload: cartList });
    }
  }, [cartList]);

  const getTotalPrice = () => {
    return (
      cartList?.reduce(
        (accumulator, item) => accumulator + item.max_price * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <Fragment>
      <CheckoutNavLayout authToken={authToken}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            {cartList?.map((item) => (
              <ProductCard7 key={item.id} product={item} />
            ))}
          {cartList?.length === 0 && <EmptyCart />}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Card
              sx={{
                padding: "1.5rem 1.75rem",
                "@media only screen and (max-width: 678px)": {
                  padding: "1rem",
                },
              }}
            >
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Span color="grey.600">Total Cart Items:</Span>
                <FlexBox alignItems="flex-end">
                  <Span fontSize="18px" fontWeight="600" lineHeight="1">
                    {cartList?.length}
                  </Span>
                </FlexBox>
              </FlexBox>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Span color="grey.600">Total:</Span>
                <FlexBox alignItems="flex-end">
                  <Span fontSize="18px" fontWeight="600" lineHeight="1">
                    Rs {getTotalPrice().toFixed(2)}
                  </Span>
                </FlexBox>
              </FlexBox>

              <Divider
                sx={{
                  mb: "1rem",
                }}
              />

              {/* <FlexBox alignItems="center" mb={2}>
              <Span fontWeight="600" mr={1.25}>
                Additional Comments
              </Span>
              <Span
                fontSize="12px"
                color="primary.main"
                lineHeight="1"
                p="6px 10px"
                bgcolor="primary.light"
                borderRadius="3px"
              >
                Note
              </Span>
            </FlexBox> */}

              {/* <TextField
              variant="outlined"
              rows={6}
              fullWidth
              multiline
              sx={{
                mb: "1rem",
              }}
            /> */}
              {/* 
            <Divider
              sx={{
                mb: "1rem",
              }}
            /> */}

              {/* <TextField
              label="Voucher"
              placeholder="Voucher"
              size="small"
              variant="outlined"
              fullWidth
            /> */}

              {/* <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                mt: "1rem",
                mb: "30px",
              }}
            >
              Apply Voucher
            </Button> */}

              {/* <Divider
              sx={{
                mb: "1rem",
              }}
            /> */}

              {/* <Span fontWeight="600" mb={2} display="block">
              Shipping Estimates
            </Span>

            <Autocomplete
              options={countryList}
              getOptionLabel={(option) => option.label}
              fullWidth
              sx={{
                mb: "1rem",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  placeholder="Select Country"
                  variant="outlined"
                  size="small"
                />
              )}
            /> */}

              {/* <TextField
              label="State"
              placeholder="Select State"
              select
              variant="outlined"
              size="small"
              fullWidth
            >
              {stateList.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Zip Code"
              placeholder="3100"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mt: "1rem",
              }}
            /> */}

              {/* <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                my: "1rem",
              }}
            >
              Calculate Shipping
            </Button> */}

              <Link href="/checkout" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={cartItemIds?.length === 0 || cartList?.length === 0}
                >
                  Checkout Now
                </Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </CheckoutNavLayout>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const { req } = context;
  const auth_token = req?.cookies?.token || null;
  const session_id = req?.cookies?.sessionId || null;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 10;
  let cartListItem = [];
  if (auth_token) {
    cartListItem = await getCartList(auth_token, page, limit);
  } else {
    cartListItem = await sessionGetCartList(session_id);
  }
  return {
    props: {
      auth_token,
      cartListItem,
    },
  };
}

export default Cart;
