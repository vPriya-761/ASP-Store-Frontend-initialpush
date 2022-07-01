import BazarCard from "components/BazarCard";
import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import FlexBox from "../FlexBox";
import ProductCard1 from "../product-cards/ProductCard1";
import ProductCategoryItem from "./ProductCategoryItem";
import Link from "next/link";

const Section6 = ({ carList, carBrands,brands }) => {
  const [selected, setSelected] = useState("");

  const handleCategoryClick = ({ currentTarget: { id: brand } }) => {
    if (selected === brand) {
      setSelected("");
    } else setSelected(brand);

    return "";
  };

  return (
    <Container
      sx={{
        mb: "80px",
      }}
    >
      <FlexBox>
        <BazarCard
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            borderRadius: "10px",
            padding: "1.25rem",
            mr: "1.75rem",
            minWidth: "240px",
            height: "100%",
          }}
        >
          {brands.slice(0,4).map((brand) => (
            <Link href={`/store/${brand.id}`}  key={brand.id}>
            <a>
            <ProductCategoryItem
              key={brand.id}
              id={brand.id}
              title={brand.name}
              sx={{
                mb: "0.75rem",
              }}
              imgUrl={'/'}
              isSelected={selected === brand}
              onClick={handleCategoryClick}
            />
            </a>
            
            </Link>
           
          ))}

          <ProductCategoryItem
            id="all"
            title="View All Brands"
            isSelected={selected === "all"}
            onClick={handleCategoryClick}
            sx={{
              mt: "4rem",
              height: "44px",
              justifyContent: "center",
            }}
          />
        </BazarCard>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title="Cars" seeMoreLink="#" />
          <Grid container spacing={3}>
            {carList.map((item, ind) => (
              <Grid item lg={4} sm={6} xs={12} key={ind}>
                <ProductCard1 hoverEffect {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
};

export default Section6;
