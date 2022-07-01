import { Link } from "@mui/material";
import BazarImage from "components/BazarImage";
import React from "react"; // component props interface

const CarouselBanner = ({ carousel }) => {
  return (
      <Link href={carousel.redirect_url} target="_blank">
      <BazarImage
            src={carousel.banner_url}
            alt={carousel.order}
            sx={{
              display: "block",
              mx: "auto",
              maxHeight: "100%",
              maxWidth: "100%",
              width: "100%"
            }}
          />
      </Link> 
  );
};

export default CarouselBanner;
