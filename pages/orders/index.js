import CustomerDashboardLayout from "components/layout/CustomerDashboardLayout";
import CustomerOrderList from "components/orders/CustomerOrderList";
import React, { useEffect } from "react";
import { getOrders, getOrderStatuses } from "utils/api/orders-api/ordersAPI";
import { useAppContext } from "contexts/app/AppContext";

const Orders = (props) => {
  const { ordersList, orderStatuses, page, limit, auth_token } = props;
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "ORDERSTATUS_LIST", payload: orderStatuses });
  }, [orderStatuses]);

  return (
    <CustomerDashboardLayout authToken={auth_token}>
      <CustomerOrderList ordersList={ordersList} page={page} limit={limit} />
    </CustomerDashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 10;
  const auth_token = req?.cookies?.token || null;
  const ordersList = await getOrders(auth_token, page, limit);
  const orderStatuses = await getOrderStatuses(auth_token);
  return {
    props: {
      ordersList,
      orderStatuses,
      page,
      limit,
      auth_token,
    },
  };
}
export default Orders;
