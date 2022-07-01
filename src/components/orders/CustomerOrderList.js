import FlexBox from "components/FlexBox";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Pagination } from "@mui/material";
import React, { Fragment, useState } from "react";
import OrderRow from "./OrderRow"; // component props interface
import { useRouter } from "next/router";
import { paginationCount } from "../../../helper/filters";
import EmptyCart from "components/product-cards/EmptyCart";

const CustomerOrderList = ({ ordersList, page, limit }) => {
  const router = useRouter();
  const pageCount = paginationCount(ordersList?.count, limit);
  const handleChange = (event, value) => {
    const currentPath = `/orders`;
    const currentQuery = router.query;
    currentQuery.page = value;
    currentQuery.limit = limit;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  return (
    <Fragment>
      <DashboardPageHeader
        title="My Orders"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />
      {ordersList?.length === 0 ? (
        <div>
          <TableRow
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              padding: "0px 18px",
              background: "none",
            }}
            elevation={0}
          >
            <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
              Order #
            </H5>
            <H5 color="grey.600" my="0px" mx={0.75} textAlign="center">
              Status
            </H5>
            <H5 color="grey.600" my="0px" mx={0.75} textAlign="center">
              Date purchased
            </H5>
            <H5 color="grey.600" my="0px" mx={1} textAlign="end">
              Total
            </H5>
            <H5
              flex="0 0 0 !important"
              color="grey.600"
              px={2.75}
              py={0.5}
              my={0}
            ></H5>
          </TableRow>
          {ordersList?.data?.map((item, ind) => (
            <OrderRow item={item} key={ind} />
          ))}

          <FlexBox justifyContent="center" mt={5}>
            <Pagination
              count={pageCount}
              variant="outlined"
              color="primary"
              onChange={handleChange}
              page={page}
            />
          </FlexBox>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Fragment>
  );
};

export default CustomerOrderList;
