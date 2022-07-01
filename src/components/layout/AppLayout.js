import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import Head from "next/head";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAppContext } from "contexts/app/AppContext";
import { getCategories2 } from "utils/api/superstore-shop/carousels";
import {
  getCartList,
  sessionGetCartList,
} from "utils/api/checkout-apis/checkoutAPI";

import { getBrands } from "utils/api/superstore-shop/sections";

const AppLayout = ({ children, navbar, title = "Fabmerce" }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => {
    setIsFixed(fixed);
  }, []);
  const { state, dispatch } = useAppContext();
  const { updateCartList } = state?.cart;

  //  setAuth Token
  useEffect(() => {
    const auth_token = getCookie("token");
    dispatch({ type: "AUTH_TOKEN", payload: auth_token });
  }, []);

  // fetchCategories
  useEffect(() => {
    const res = getCategories2();
    res
      .then((data) => {
        dispatch({ type: "CATAGORIGES_LIST", payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  fetch CartList
  useEffect(() => {
    const auth_token = getCookie("token");
    const sessionId = getCookie("sessionId");
    if (updateCartList === true) {
      if (auth_token && auth_token !== null) {
        const response = getCartList(auth_token, 1, 10);
        updateCartCount(response);
      } else {
        const response = sessionGetCartList(sessionId, 1, 10);
        updateCartCount(response);
      }
    }
  }, [updateCartList]);

  const updateCartCount = (res) => {
    res
      .then((data) => {
        dispatch({
          type: "CART_LIST",
          payload: data?.cart_items,
        });
        dispatch({ type: "UPDATE_CART_LIST", payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetchBrandList
  useEffect(() => {
    const res = getBrands();
    res
      .then((data) => {
        dispatch({ type: "BRANDS_LIST", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar />
      <Sticky fixedOn={0} onSticky={toggleIsFixed}>
        <Header isFixed={isFixed} />
      </Sticky>
      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar />
      <Footer />
    </Fragment>
  );
};

export default AppLayout;
