import React, { useState, useEffect } from "react";
import NavbarLayout from "components/layout/NavbarLayout";
import ProductDescription from "components/products/ProductDescription";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import { Box, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { H2 } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";

import {
  getFrequentlyBought,
  getRelatedProducts,
  getProductDetails,
  getReviews,
} from "utils/api/related-products/products";
import {
  findAttributevalues,
  groupByVariants,
  varientsCompare,
  findImage,
} from "../../helper/filters";
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 24,
  minHeight: 0,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    fontWeight: 600,
    minHeight: 40,
    textTransform: "capitalize",
  },
}));

const ProductDetails = (props) => {
  const { relatedProducts, productDetails, productReviews, page, limit } = props;
  const [selectedOption, setSelectedOption] = useState(0);
  const [slecetedValue, setSelectedValue] = useState();
  const [varientName, setVarientName] = useState();
  const { dispatch } = useAppContext();
  let parentFilters = props.productDetails?.reduce(groupByVariants, []);
  parentFilters = parentFilters?.map((filter) => {
    const filterObj = filter;
    filterObj.data = filterObj?.data?.map((data) => ({
      value: data,
      display: false,
    }));
    return filterObj;
  });
  const [varients, setVarients] = useState(parentFilters || {});
  const productImages = findImage(props?.productDetails);

  const handleOptionClick = (_event, newValue) => {
    setSelectedOption(newValue);
  };

  useEffect(() => {
    let filteredVariant = findAttributevalues(
      props?.productDetails,
      slecetedValue
    );
    filteredVariant = filteredVariant.reduce(groupByVariants, []);
    if (filteredVariant.length > 0) {
      const res = varientsCompare(parentFilters, filteredVariant, varientName);
      setVarients(res);
    }
  }, [slecetedValue]);

  useEffect(() => {
    dispatch({ type: "UPDATE_CART_LIST", payload: true });
  }, []);

  return (
    <NavbarLayout>
      {productDetails ? (
        <ProductIntro
          product={productDetails[0]}
          productDetails={productDetails}
          productVarients={varients}
          setSelectedValue={setSelectedValue}
          productImages={productImages}
          setVarientName={setVarientName}
        />
      ) : (
        <H2>Loading...</H2>
      )}
      <StyledTabs
        value={selectedOption}
        onChange={handleOptionClick}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab className="inner-tab" label="Description" />
        <Tab className="inner-tab" label={`Review ${productReviews?.data?.length ? `(${productReviews?.data?.length})`:""}`} />
      </StyledTabs>
      <Box mb={6}>
        {selectedOption === 0 && (
          <ProductDescription description={productDetails[0]?.description} />
        )}
        {selectedOption === 1 && 
          <ProductReview 
            reviewData={productReviews.data} 
            count={productReviews.count}
            page={page}
            limit={limit}
          />
        }
      </Box>
    </NavbarLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 10;
  const productDetails = await getProductDetails(id);
  const frequentlyBought = await getFrequentlyBought();
  const relatedProducts = await getRelatedProducts();
  const productReviews = await getReviews(id, page, limit);
  return {
    props: {
      frequentlyBought,
      relatedProducts,
      productDetails,
      productReviews,
      page, 
      limit
    },
  };
}
export default ProductDetails;
