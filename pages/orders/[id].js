import DashboardLayout from "components/layout/CustomerDashboardLayout";
import FlexBox from "components/FlexBox";
import Delivery from "components/icons/Delivery";
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H5, H6, Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, useTheme } from "@mui/system";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { getOrderDetails } from "utils/api/orders-api/ordersAPI";
import StatusSteppers from "components/stepper/StatusSteppers";
const StyledFlexbox = styled(FlexBox)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    flex: "1 1 0",
    height: 4,
    minWidth: 50,
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));

const OrderDetails = (props) => {
  const { orderInfo,auth_token } = props;
  const width = useWindowSize();
  const theme = useTheme();
  const breakpoint = 350;
  console.log(theme.breakpoints.up("md"));
  return (
    <DashboardLayout authToken={auth_token}>
      <DashboardPageHeader
        title="Order Details"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      <Card
        sx={{
          mb: "30px",
        }}
      >
        <StyledFlexbox>
          <StatusSteppers activeSetp={orderInfo?.status} />
        </StyledFlexbox>
      </Card>

      <Card
        sx={{
          p: "0px",
          mb: "30px",
        }}
      >
        <TableRow
          sx={{
            bgcolor: "grey.200",
            p: "12px",
            boxShadow: "none",
            borderRadius: 0,
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize="14px" color="grey.600" mr={0.5}>
              Order ID:
            </Typography>
            <Typography fontSize="14px">{orderInfo?.source_id}</Typography>
          </FlexBox>
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize="14px" color="grey.600" mr={0.5}>
              Placed on:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(orderInfo?.order_confirmed_at), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize="14px" color="grey.600" mr={0.5}>
              Delivered on:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(orderInfo?.order_delivered_at), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {orderInfo?.line_items?.map((item) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={item.id}
            >
              <FlexBox
                flex="2 2 260px"
                m={0.75}
                alignItems="center"
                key={item.id}
              >
                <Avatar
                  src={item.product_image}
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                />
                <Box ml={5}>
                  <H6 my="0px">{item.product_name}</H6>
                  <Typography fontSize="14px" color="grey.600">
                    Rs {item.total_price}
                  </Typography>
                  <Typography fontSize="14px" color="grey.600">
                    quantity : {item.quantity}
                  </Typography>
                  <Typography fontSize="14px" color="grey.600">
                    soldby : {item.brand_name}
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  {item.product_description}
                </Typography>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.shipping_address?.address_line_1}{" "}
              {orderInfo?.shipping_address?.address_line_1}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.shipping_address?.city}{" "}
              {orderInfo?.shipping_address?.province}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.shipping_address?.country} {"-"}
              {orderInfo?.shipping_address?.postal_index_code}
            </Typography>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Billing Address
            </H5>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.billing_address?.address_line_1}{" "}
              {orderInfo?.billing_address?.address_line_1}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.billing_address?.city}{" "}
              {orderInfo?.billing_address?.province}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.billing_address?.country} {"-"}
              {orderInfo?.billing_address?.postal_index_code}
            </Typography>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>
            <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontSize="14px" color="grey.600">
                Subtotal:
              </Typography>
              <H6 my="0px">Rs {orderInfo?.total_price}</H6>
            </FlexBox>
            <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontSize="14px" color="grey.600">
                Shipping fee:
              </Typography>
              <H6 my="0px">Rs {orderInfo?.total_shipping_price}</H6>
            </FlexBox>

            <Divider
              sx={{
                mb: "0.5rem",
              }}
            />

            <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">
                Rs {orderInfo?.total_price + orderInfo?.total_shipping_price}
              </H6>
            </FlexBox>
            <Typography fontSize="14px">
              Paid by {orderInfo?.payment_type}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { req } = context;
  const { id } = params;
  const auth_token = req?.cookies?.token;
  const orderInfo = await getOrderDetails(id, auth_token);
  return {
    props: {
      orderInfo,
      auth_token
    },
  };
}

export default OrderDetails;
