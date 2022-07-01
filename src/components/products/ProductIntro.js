/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import { H1, H2, H6 } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import FlexBox from "../FlexBox";
import QuantityButtons from "components/QuantityButtons";
import {
  addToCart,
  sessionAddToCart,
} from "utils/api/checkout-apis/checkoutAPI";
import { getCookie } from "cookies-next";
import CustomizedSnackbars from "components/Snackbar";
import { CheckCircle } from "@mui/icons-material";
import { instock } from "theme/themeColors";

const ProductIntro = ({
  product,
  productVarients,
  setSelectedValue,
  productImages,
  setVarientName,
}) => {
  const { id, max_price, name, gallary_photos, stock_status, sku_name, min_price } = product;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [colorImage, setColorImage] = useState(0);
  const [colorButton, setColorButtton] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const brandInfo = JSON?.parse(router?.query?.brnd);
  const { authToken } = state?.authToken;
  const [openSnackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const actionButton = stock_status === "outofstock" ? true : false;
  const buynowButton = stock_status === "outofstock" || authToken === null || authToken === undefined;
  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };

  const handleColorImageClick = (ind, value, name) => () => {
    setColorImage(ind);
    setSelectedValue(value);
    setVarientName(name);
  };

  const handleButtonColors = (ind, value, name) => () => {
    setColorButtton(ind);
    setSelectedValue(value);
    setVarientName(name);
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const addCartItems = (qty) => {
    const details = {
      product_id: id,
      guest_user: 0,
      quantity: qty,
    };
    const res = addToCart(details);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully added to your cart");
          setSnackbar(true);
          dispatch({ type: "UPDATE_CART_LIST", payload: true });
          // router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addtoSessionCart = (qty) => {
    const sessionId = getCookie("sessionId");
    const details = {
      session_id: sessionId,
      product_id: id,
      guest_user: 1,
      quantity: qty,
    };
    const res = sessionAddToCart(details);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully added to your cart");
          setSnackbar(true);
          dispatch({ type: "UPDATE_CART_LIST", payload: true });
          // router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      if (authToken) {
        addCartItems(amount);
      } else {
        addtoSessionCart(amount);
      }
    },
    []
  );

  // direct buynow product
  const productBuyNow = () => {
    router.push({
      pathname: "/checkout-alternative",
      query: {
        buyNow: JSON.stringify({
          product_parent_id: product?.product_parent_id,
          qty: quantity,
          product_id: id,
        }),
      },
    });
  };

  return (
    <Box width="100%">
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb={6}>
              <LazyImage
                src={
                  product?.gallary_photos[selectedImage] ||
                  product?.profile_photo
                }
                onClick={() =>
                  openImageViewer(
                    gallary_photos?.indexOf(gallary_photos[selectedImage]) ||
                      product?.profile_photo
                  )
                }
                alt={name}
                height={420}
                width={420}
                loading="eager"
                objectFit="contain"
              />
              {isViewerOpen && (
                <ImageViewer
                  src={gallary_photos || []}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                  }}
                />
              )}
            </FlexBox>
            {gallary_photos?.length > 0 && (
              <FlexBox overflow="auto">
                {gallary_photos?.map((url, ind) => (
                  <Box
                    height={64}
                    width={64}
                    minWidth={64}
                    bgcolor="white"
                    borderRadius="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid"
                    style={{
                      cursor: "pointer",
                    }}
                    ml={ind === 0 ? "auto" : 0}
                    mr={ind === gallary_photos?.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "grey.400"
                    }
                    onClick={handleImageClick(ind)}
                    key={ind}
                  >
                    <BazarAvatar src={url} variant="square" height={40} />
                  </Box>
                ))}
              </FlexBox>
            )}
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2} sx={{ fontSize: "25px" }}>{name}</H1>

          <FlexBox alignItems="center" mb={2}>
            <Box sx={{ fontSize: "16px" }}>{product?.short_description}</Box>
          </FlexBox>

          {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazarRating color="warn" fontSize="1.25rem" value={4} readOnly />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox> */}

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              <del style={{ fontWeight: "400" }}>₹ {max_price.toFixed(2)}</del>
              &nbsp;&nbsp;₹ {min_price.toFixed(2)}
            </H2>
            <Box>
              {product?.quantity > 0 ?
                <div style={{ display: "flex", alignItems: "center", color: instock?.available}}>
                  <CheckCircle sx={{ fontSize: "14px" }} />&nbsp;{product?.quantity}{" "}{stock_status.toUpperCase()}
                </div> :
                <div style={{ color: instock?.unavailable }}>OUT OF STOCK</div>}
            </Box>
          </Box>
          <Box alignItems="center" mb={2}>
            {productVarients?.map((i, ind) => {
              return (
                <Box alignItems="center" mb={3} key={ind}>
                  <Box lineHeight={2}> {i.name}</Box>
                  <Box>
                    <Grid container spacing={1}>
                      {i?.data?.map((item, ind) => {
                        return (
                          <Grid item key={ind}>
                            {i.name === "COLOR" ? (
                              <FlexBox overflow="auto">
                                <Tooltip title={item.value} arrow>
                                  <Box
                                    height={64}
                                    width={64}
                                    minWidth={64}
                                    bgcolor="white"
                                    borderRadius="10px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    border="1px solid"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    ml={ind === 0 ? "auto" : 0}
                                    borderColor={
                                      colorImage === ind
                                        ? "primary.main"
                                        : "grey.400"
                                    }
                                    onClick={handleColorImageClick(
                                      ind,
                                      item.value,
                                      i.name
                                    )}
                                    key={ind}
                                  >
                                    <BazarAvatar
                                      src={productImages[0][item.value]}
                                      variant="square"
                                      height={40}
                                    />
                                  </Box>
                                </Tooltip>
                              </FlexBox>
                            ) : (
                              <Button
                                key={ind}
                                variant="outlined"
                                disabled={item.display}
                                style={{
                                  borderColor:
                                    colorButton === ind ? "#D23F57" : "#DAE1E7",
                                }}
                                onClick={handleButtonColors(
                                  ind,
                                  item.value,
                                  i.name
                                )}
                              >
                                {item?.value}
                              </Button>
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <QuantityButtons quantity={quantity} setQuantity={setQuantity} />
          <Grid container spacing={3}>
            <Grid item>
              <BazarButton
                variant="contained"
                color="secondary"
                sx={{
                  mb: "36px",
                  px: "1.75rem",
                  height: "40px",
                }}
                disabled={buynowButton}
                onClick={productBuyNow}
              >
                Buy Now
              </BazarButton>
            </Grid>

            <Grid item>
              <BazarButton
                variant="contained"
                color="primary"
                sx={{
                  mb: "36px",
                  px: "1.75rem",
                  height: "40px",
                }}
                onClick={handleCartAmountChange(quantity)}
                disabled={actionButton}
              >
                Add to Cart
              </BazarButton>
            </Grid>
          </Grid>

          <FlexBox alignItems="center" mb={2}>
            <Box>Brand:</Box>
            <Link href={`/store/${brandInfo?.brandId}`}>
              <a>
                <H6 ml={1}>{brandInfo?.branName}</H6>
              </a>
            </Link>
          </FlexBox>
          <FlexBox>
            <Box>SKU:</Box>&nbsp;<H6>{sku_name}</H6>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
