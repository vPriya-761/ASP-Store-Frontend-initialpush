import React from "react";
import { TextField,Container } from "@mui/material";
import { Box} from "@mui/system";
import BazarButton from "components/BazarButton";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";

const BrandsSearchBar = () => {
  return (
    <Container>
      <Box className="searchBox">
        <TextField
          placeholder="Searching for..."
          fullWidth
          InputProps={{
            sx: {
              height: 40,
              paddingRight: 0,
              width:300,
              color: "grey.700",
              background: "grey.700",
              "& fieldset": {
                border: "none",
              },
            },
            endAdornment: (
              <BazarButton
                color="secondary"
                variant="contained"
                disableElevation
                sx={{
                  px: "2rem",
                  height: "100%",
                  borderRadius: "0 0 0 0",
                }}
              >
                Search
              </BazarButton>
            ),
            startAdornment: <SearchOutlinedIcon fontSize="small" />,
          }}
        />
      </Box>
    </Container>
  );
};

export default BrandsSearchBar;
