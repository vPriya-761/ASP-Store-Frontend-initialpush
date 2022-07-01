import { H3 } from "components/Typography";
import { Box } from "@mui/material";
import React from "react";

const ProductDescription = ({description}) => {
  return (
    <Box>
      <H3 mb={2}>Specification:</H3>
      <Box fontSize="16px">
       {description}
      </Box>
    </Box>
  );
};

export default ProductDescription;
