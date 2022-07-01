import React,{useState} from "react";
import { Container, Grid,Button,Box } from "@mui/material";
import CategorySectionHeader from "../CategorySectionHeader";
import MoreProductCard from "../product-cards/MoreProductCard";

const MoreProduct = ({ moreItems }) => {
  const [Products, setProducts] = useState(moreItems);
  const [Count, setCount] = useState(12);
  const onClickDiscovermore = () => {
    setCount((initialCount) => initialCount + 4);
    setProducts(Products);
  };
  return (
    <Container
      sx={{
        mb: "70px",
      }}
    >
      <CategorySectionHeader title="More For You"  />
      <Grid container spacing={3}>
        {Products.slice(0, Count).map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <MoreProductCard off={25} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
      <Box mt={6} display="flex" justifyContent="center">
        {Count < Products?.length && <Button color="primary" variant="contained" onClick={onClickDiscovermore}>
          Load More...
        </Button>}
      </Box>
    </Container>
  );
};

export default MoreProduct;
