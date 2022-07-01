import React from "react";
import { Box,Grid,Typography } from "@mui/material";
import Image from "next/image";

const Bottom = () => {
  return (
    <>
      <Box
        bgcolor="#0c0e30"
        sx={{ flexGrow: 1, color: "white",mt:"2rem" ,heigt:"30px"}}
      >
        <Grid container spacing={3} sx={{fontSize:"15px"}}> 
          <Grid item xs={7}>
            <Typography>Copyright &copy; 2022 Fabmerce</Typography>
          </Grid> 
          <Grid item xs={4}>
          <Image    src={
                "https://www.fabmerce.com/wp-content/uploads/2021/12/payements.svg"
              }
              width={400}
              height={50}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Bottom;
