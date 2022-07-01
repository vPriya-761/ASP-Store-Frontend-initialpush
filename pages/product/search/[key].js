import React, { useState, useEffect, useCallback } from "react";
import NavbarLayout from "components/layout/NavbarLayout";
import FlexBox from "components/FlexBox";
import SearchProductCardList from "components/products/SearchProductCardList";
import SearchProductFilterCard from "components/products/SearchProductFilterCard";
import Sidenav from "components/sidenav/Sidenav";
import { H5, Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import FilterList from "@mui/icons-material/FilterList";
import { Card, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getProductSearch } from "utils/api/layout-apis/layoutsAPI";

const ProductSearchResult = (props) => {
  const { productList, searchKey, page, limit, shortBy } = props;
  const [searchProductList, setBrandProductList] = useState(productList);
  const [shortby, setShortBy] = useState(shortBy);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const width = useWindowSize();
  const isTablet = width < 1024;

  const updateBrandProductList = useCallback(() => {
    const res = getProductSearch(
      searchKey,
      page,
      limit,
      minPrice,
      maxPrice,
      shortby
    );
    res
      .then((data) => {
        if (data.data) {
          setBrandProductList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchKey, page, limit, minPrice, maxPrice, shortby, productList]);

  useEffect(() => {
    updateBrandProductList();
  }, [searchKey, page, limit, minPrice, maxPrice, shortby, productList]);

  return (
    <NavbarLayout>
      <Box pt={2.5}>
        <Card
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "55px",
            p: {
              xs: "1.25rem 1.25rem 0.25rem",
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
            },
          }}
          elevation={1}
        >
          <div>
            <H5>Searching for "{searchKey}" </H5>
            <Paragraph color="grey.600">
              {productList?.count} results found
            </Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap" my="0.5rem">
            <FlexBox alignItems="center" flex="1 1 0">
              <Paragraph color="grey.600" mr={2} whiteSpace="pre">
                Short by:
              </Paragraph>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Short by"
                select
                defaultValue={sortOptions[0].value}
                fullWidth
                sx={{
                  flex: "1 1 0",
                  mr: "1.75rem",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map((item, ind) => (
                  <MenuItem
                    value={item.value}
                    key={ind}
                    onClick={() => {
                      setShortBy(item.value);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              {/* <Paragraph color="grey.600" mr={1}>
                  View:
                </Paragraph>
                <IconButton onClick={toggleView("grid")}>
                  <Apps
                    color={view === "grid" ? "primary" : "inherit"}
                    fontSize="small"
                  />
                </IconButton>
                <IconButton onClick={toggleView("list")}>
                  <ViewList
                    color={view === "list" ? "primary" : "inherit"}
                    fontSize="small"
                  />
                </IconButton> */}

              {!!isTablet && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <SearchProductFilterCard
                    setMaxPrice={setMaxPrice}
                    setMinPrice={setMinPrice}
                  />
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          <Grid
            item
            lg={3}
            xs={12}
            sx={{
              "@media only screen and (max-width: 1024px)": {
                display: "none",
              },
            }}
          >
            <SearchProductFilterCard
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
            />
          </Grid>

          <Grid item lg={9} xs={12}>
              <SearchProductCardList
                productList={searchProductList}
                page={page}
                limit={limit}
              />
          </Grid>
        </Grid>
      </Box>
    </NavbarLayout>
  );
};

const sortOptions = [
  {
    label: "Price Low to High",
    value: "ASC",
  },
  {
    label: "Price High to Low",
    value: "DESC",
  },
];

export async function getServerSideProps(context) {
  const { params } = context;
  const { key } = params;
  const searchKey = key;
  let minPrice = 0;
  let maxPrice = 0;
  let shortBy = "ASC";
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 20;
  const productList = await getProductSearch(
    searchKey,
    page,
    limit,
    minPrice,
    maxPrice,
    shortBy
  );
  return {
    props: {
      productList,
      searchKey,
      page,
      limit,
      shortBy,
    },
  };
}

export default ProductSearchResult;
