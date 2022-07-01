import FlexBox from "components/FlexBox";
import { Span } from "components/Typography";
import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppContext } from "contexts/app/AppContext";
import LazyImage from "components/LazyImage";
import Card1 from "components/Card1";
import { getshippingCharge } from "utils/api/orders-api/ordersAPI";


const CheckoutSummary2 = () => {
  const { state, dispatch } = useAppContext();
  const { shippingAddress, buyNowProduct } = state?.orderStatus;
  const { authToken } = state?.authToken;
  const { shippingCharge } = state?.orderStatus;
  const shipping = parseFloat(shippingCharge?.shipping_charges) || 0;
  const subTotal = buyNowProduct?.qty * buyNowProduct?.max_price;
  const total = subTotal + shipping;

  useEffect(() => {
    if (buyNowProduct && shippingAddress) {
      const details = {
        product_details: [
          {
            product_id: buyNowProduct?.id,
            quantity: buyNowProduct?.qty,
          },
        ],
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
  }, [shippingAddress]);

  return (
    <Card1>
      <Box>
        <Typography color="secondary.900" fontWeight="700" mb={3}>
          Your order
        </Typography>
        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <LazyImage
            src={buyNowProduct?.profile_photo}
            alt={buyNowProduct?.name}
            height={200}
            width={200}
            loading="eager"
            objectFit="contain"
          />
          <div>
            <Typography>
              <Span fontWeight="700" fontSize="14px">
                {buyNowProduct?.name}
              </Span>
            </Typography>
          </div>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Quantity:</Typography>
          <Typography>{buyNowProduct?.qty}</Typography>
        </FlexBox>

        <Divider
          sx={{
            borderColor: "grey.300",
            mb: "1.5rem",
          }}
        />

        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Subtotal:</Typography>
          <Typography fontWeight="700">
            Rs.&nbsp; {subTotal.toFixed(2)}
          </Typography>
        </FlexBox>

        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Shipping:</Typography>
          <Typography fontWeight="700">
            {" "}
            Rs.&nbsp; {shipping.toFixed(2)}
          </Typography>
        </FlexBox>

        {/* <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <Typography fontWeight="700">${(40).toFixed(2)}</Typography>
      </FlexBox> */}

        {/* <FlexBox justifyContent="space-between" alignItems="center" mb={3}>
        <Typography color="grey.600">Discount:</Typography>
        <Typography fontWeight="700">-</Typography>
      </FlexBox> */}

        <Divider
          sx={{
            borderColor: "grey.300",
            mb: "0.5rem",
          }}
        />

        <FlexBox
          fontWeight="700"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography>Total:</Typography>
          <Typography fontWeight="700">Rs.&nbsp;{total.toFixed(2)}</Typography>
        </FlexBox>
      </Box>
    </Card1>
  );
};
export default CheckoutSummary2;
