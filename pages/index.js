import Promotion from "components/superstore-shop/Promotion";
import MoreProduct from "components/superstore-shop/MoreProduct";
import Section12 from "components/superstore-shop/Section12";
import TrendingProducts from "components/superstore-shop/TrendingProducts";
import NewArrivals from "components/superstore-shop/NewArrivals";
import {
  getMoreItems,
  getNewArrivalList,
  getServiceList,
  getTrendingProduct,
  getBanners
} from "utils/api/superstore-shop/sections";
import { useEffect } from "react";
import { getCookie, setCookies } from "cookies-next";
import { useAppContext } from "contexts/app/AppContext";
import AppLayout from "components/layout/AppLayout";
import { uid } from "../helper/randomId";
import { NumberFormat } from "../src/components/comma-separator/NumberFormat";
import { useState } from "react";
const Index = (props) => {
  const { dispatch } = useAppContext();
  const {
    newArrivalsProduct,
    moreItems,
    serviceList,
    trendingProduct,
    promotionBanners,
    format,
    currency
  } = props;
  const [numberFormat, setNumberFormat] = useState(format);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  useEffect(() => {
    dispatch({ type: "UPDATE_CART_LIST", payload: true });
    const originURL = window.location.hostname;
    const domain_name = originURL.substring(originURL.indexOf(".") + 1);
    NumberFormat?.filter(data => data?.domain_name === domain_name).map(location => {
      setNumberFormat(location?.code);
      setSelectedCurrency(location?.currency)
    })
  }, []);

  return (
    <AppLayout>
      <Promotion promotionBanners={promotionBanners} />
      <NewArrivals newArrivalsProduct={newArrivalsProduct} format={numberFormat} currency={selectedCurrency} />
      <TrendingProducts trendingProduct={trendingProduct} format={numberFormat} currency={selectedCurrency} />
      <MoreProduct moreItems={moreItems?.data} />
      <Section12 serviceList={serviceList} />
    </AppLayout>
  );
};

export async function getServerSideProps({ req, res }) {
  const sessionLogin = getCookie("token", { req, res }) || null;
  const sessionId = getCookie("sessionId", { req, res }) || null;
  if (sessionLogin === null && sessionId === null) {
    const randomId = uid();
    setCookies("sessionId", randomId, { req, res });
  }
  const newArrivalsProduct = await getNewArrivalList();
  const moreItems = await getMoreItems();
  const serviceList = await getServiceList();
  const trendingProduct = await getTrendingProduct();
  const promotionBanners = await getBanners();
  let format = "en-IN", currency = "INR";
  return {
    props: {
      newArrivalsProduct,
      moreItems,
      serviceList,
      sessionLogin,
      trendingProduct,
      promotionBanners,
      format,
      currency
    },
  };
}

export default Index;
