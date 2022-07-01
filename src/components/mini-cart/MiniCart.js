/* eslint-disable react-hooks/exhaustive-deps */
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarIconButton from "components/BazarIconButton";
import FlexBox from "components/FlexBox";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import LazyImage from "components/LazyImage";
import { H5, Tiny } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";
import Close from "@mui/icons-material/Close";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import {
  removeCart,
  sessionRemoveCart,
} from "utils/api/checkout-apis/checkoutAPI";
import { useRouter } from "next/router";
import CustomizedSnackbars from "components/Snackbar";

const MiniCart = ({ toggleSidenav }) => {
  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const { cartList } = state?.cart;
  const { authToken } = state?.authToken;
  const router = useRouter();
  const [openSnackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState();

  const removeCartItems = (cart_id) => {
    const res = removeCart(cart_id);
    res
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: "UPDATE_CART_LIST", payload: true });
          setMessage("Successfully removed from your cart");
          setSnackbar(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sessionItemsRemove = (cart_id) => {
    const res = sessionRemoveCart(cart_id);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully removed from your cart");
          setSnackbar(true);
          dispatch({ type: "UPDATE_CART_LIST", payload: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCartAmountChange = useCallback(
    (amount, product) => () => {
      if (authToken) {
        removeCartItems(product?.cart_id);
      } else {
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { ...product, quantity: amount },
        });
        sessionItemsRemove(product?.cart_id);
      }
    },
    []
  );

  const getTotalPrice = () => {
    return (
      cartList.reduce(
        (accumulator, item) => accumulator + item.max_price * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <Box width="380px">
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      <Box
        overflow="auto"
        height={`calc(100vh - ${
          !!cartList?.length ? "80px - 3.25rem" : "0px"
        })`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {cartList?.length} item
          </Box>
        </FlexBox>

        <Divider />

        {!!!cartList?.length && (
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={100}
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>
        )}
        {cartList?.map((item) => (
          <FlexBox
            alignItems="center"
            py={2}
            px={2.5}
            borderBottom={`1px solid ${palette.divider}`}
            key={item.product_id}
          >
            <Link href={`/product/${item?.product_id}`}>
              <a>
                <BazarAvatar
                  src={item?.profile_photo || ""}
                  mx={2}
                  alt={item?.product_name}
                  height={76}
                  width={76}
                />
              </a>
            </Link>

            <Box flex="1 1 0">
              <Link href={`/product/${item.id}`}>
                <a>
                  <H5 className="title" fontSize="14px">
                    {item?.product_name}
                  </H5>
                </a>
              </Link>
              <Tiny color="grey.600">
                Rs {item?.max_price.toFixed(2)} x {item?.quantity}
              </Tiny>
              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                Rs {(item?.quantity * item?.max_price).toFixed(2)}
              </Box>
            </Box>
            <BazarIconButton
              ml={2.5}
              size="small"
              onClick={handleCartAmountChange(0, item)}
            >
              <Close fontSize="small" />
            </BazarIconButton>
          </FlexBox>
        ))}
      </Box>

      {!!cartList?.length && (
        <Box p={2.5}>
          <Link href="/checkout" passHref>
            <BazarButton
              variant="contained"
              color="primary"
              sx={{
                mb: "0.75rem",
                height: "40px",
              }}
              fullWidth
              onClick={toggleSidenav}
            >
              Checkout Now (Rs {getTotalPrice().toFixed(2)})
            </BazarButton>
          </Link>
          <Link href="/cart" passHref>
            <BazarButton
              color="primary"
              variant="outlined"
              sx={{
                height: 40,
              }}
              fullWidth
              onClick={toggleSidenav}
            >
              View Cart
            </BazarButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};
export default MiniCart;
