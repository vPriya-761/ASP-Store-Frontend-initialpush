import FlexBox from "components/FlexBox";
import { Span } from "components/Typography";
import { Button, Card, Divider, Grid } from "@mui/material";
import { Fragment } from "react";

const orderSummaryCard = (props) => {
  const { orderSummery,buttonName,handleFunction,disabled} = props;
  const getTotalPrice = () => {
    return (
      orderSummery?.reduce(
        (accumulator, item) => accumulator + item.max_price * item.quantity,
        0
      ) || 0
    );
  };
  return (
    <Fragment>
          <Card
            sx={{
              padding: "1.5rem 1.75rem",
              "@media only screen and (max-width: 678px)": {
                padding: "1rem",
              },
            }}
          >
            <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
              <Span color="grey.600">Total Cart Items:</Span>
              <FlexBox alignItems="flex-end">
                <Span fontSize="18px" fontWeight="600" lineHeight="1">
                  {orderSummery?.length}
                </Span>
              </FlexBox>
            </FlexBox>
            <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={disabled}
                onClick={handleFunction}
              >
               {buttonName}
              </Button>
          </Card>
    </Fragment>
  );
};
export default orderSummaryCard;
