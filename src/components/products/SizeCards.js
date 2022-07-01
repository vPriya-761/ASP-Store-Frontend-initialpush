import React from "react";
import { Button, Stack } from "@mui/material";

const availableSizes = ["S", "L", "XL", "XXL"];

const SizeCard = () => {
  return (
    <Stack spacing={2} direction="row">
      {availableSizes.map((size) => {
        return <Button variant="outlined" key={size}>{size}</Button>;
      })}
    </Stack>
  );
};

export default SizeCard;

