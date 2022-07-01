import React from "react";
import { Box, Divider, styled, Grid } from "@mui/material";
import BazarCard from "components/BazarCard";
import FlexBox from "components/FlexBox";
import { useAppContext } from "contexts/app/AppContext";
import Link from "next/link";
import BrandsSearchBar from "./BrandsSearchBar";
import { Paragraph } from "components/Typography";

const StyledLink = styled("a")(({ theme, active_route }) => ({
  position: "relative",
  cursor: "pointer",
  lineHeight: "25px",
  letterSpacing: "0.5px",
  color:
    active_route === "active"
      ? theme.palette.primary.main
      : "rgba(3, 2, 26, 0.6)",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const BrandContainer = () => {
  const { state } = useAppContext();
  return (
    <FlexBox
      position="relative"
      flexDirection="column"
      alignItems="center"
      sx={{
        "&:hover": {
          "& > .child-nav-item": {
            display: "block",
          },
        },
      }}
    >
      <Paragraph
        fontWeight="600"
        textAlign="left"
        flex="1 1 0"
        ml={1.25}
        color="grey.600"
      >
        Brands
      </Paragraph>
      <Box
        className="child-nav-item"
        sx={{
          display: "none",
          position: "absolute",
          left: 0,
          top: "100%",
          zIndex: 5,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <BazarCard
              sx={{
                mt: "1.25rem",
                py: "0.5rem",
                minWidth: "350px",
                borderRadius: "0px !important",
              }}
              elevation={3}
            >
              <BrandsSearchBar />
              <Divider
                sx={{
                  my: "1rem",
                }}
              />
              <Paragraph
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml={1.25}
                color="grey.600"
              >
                Top Brands
              </Paragraph>
              <FlexBox
                flexDirection="column"
                alignItems="start"
                sx={{
                  margin: "1rem",
                  fontSize: "15px",
                }}
              >
                {state?.brands?.brandList?.map((item, ind) => {
                  return (
                    <Link href={`/store/${item.slug}`} key={ind}>
                      <StyledLink>{item.name}</StyledLink>
                    </Link>
                  );
                })}
              </FlexBox>
            </BazarCard>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              {state?.brands?.brandList.map((item, ind) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={ind}></Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </FlexBox>
  );
};

export default BrandContainer;
