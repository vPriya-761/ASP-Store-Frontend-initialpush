import Card1 from "components/Card1";
import FlexBox from "components/FlexBox";
import { Divider, Typography } from "@mui/material";
import React from "react";
import { useAppContext } from "contexts/app/AppContext";

const PaymentSummary = () => {
  const { state } = useAppContext();
  const { orderSummery } = state?.summary;
  const { shippingCharge } = state?.orderStatus;
  const getTotalPrice = () => {
    return (
      orderSummery?.reduce(
        (accumulator, item) => accumulator + item.max_price * item.quantity,
        0
      ) || 0
    );
  };
  const subtotal = parseFloat(getTotalPrice());
  const shipping = parseFloat(shippingCharge?.shipping_charges) || 0;
  const totalAmount = subtotal + shipping || 0;

  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            Rs.&nbsp; {subtotal.toFixed(2) || 0}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Shipping:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            Rs.&nbsp; {shipping.toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider
        sx={{
          mb: "1rem",
        }}
      />

      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Total:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            Rs.&nbsp;{totalAmount.toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card1>
  );
};

export default PaymentSummary;
