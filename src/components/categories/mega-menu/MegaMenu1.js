import FlexBox from "components/FlexBox";
import LazyImage from "components/LazyImage";
import NavLink from "components/nav-link/NavLink";
import { Box, Card, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import StyledMegaMenu from "./StyledMegaMenu"; // component props with nested interface

const MegaMenu1 = ({
  data,
  minWidth,
}) => {
  return data ? (
    <StyledMegaMenu>
      <Card
        elevation={2}
        sx={{
          ml: "1rem",
          minWidth,
        }}
      >
        <FlexBox px={2.5} py={1.75} alignItems="unset">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {data?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    <NavLink className="title-link" href={`/product/search/${item.name}`}>
                      {item.name}
                    </NavLink>
                  ) : (
                    <NavLink className="title-link" href={`/product/search/${item.name}`}>
                    <Box className="title-link">{item.name}</Box>
                    </NavLink>
                  )}
                  {item.children?.map((sub, ind) => (
                    <NavLink className="child-link" href={`/product/search/${sub.name}`} key={ind}>
                      {sub.name}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>
        </FlexBox>
      </Card>
    </StyledMegaMenu>
  ) : null;
};

MegaMenu1.defaultProps = {
  minWidth: "760px",
};
export default MegaMenu1;
