import React from "react";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import { H6 } from "../Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

const AddressCards = ({ locationsList,setEditLocation,setSelectedAddress }) => {
  const router = useRouter();
  return (
    <Container
      sx={{
        mb: "70px",
      }}
    >
      <Grid container spacing={1}>
        {locationsList.map((item, ind) => {
          return (
            <Grid item lg={6} md={3} xs={10} key={ind}>
              <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                  <H6>
                    {item.contact_firstname} {item.contact_lastname}{" "}
                  </H6>
                  <Typography
                    whiteSpace="pre"
                    m={0.75}
                    textAlign="left"
                    color="grey.600"
                  >
                    {item.address_line_1}, {item.address_line_2}
                  </Typography>
                  <Typography
                    whiteSpace="pre"
                    m={0.75}
                    textAlign="left"
                    color="grey.600"
                  >
                    {item.city},
                  </Typography>
                  <Typography
                    whiteSpace="pre"
                    m={0.75}
                    textAlign="left"
                    color="grey.600"
                  >
                    {item.province},{item.postal_index_code}
                  </Typography>
                  <Typography
                    whiteSpace="pre"
                    m={0.75}
                    textAlign="left"
                    color="grey.600"
                  >
                    {item.country}
                  </Typography>
                  <Typography
                    whiteSpace="pre"
                    m={0.75}
                    textAlign="left"
                    color="grey.600"
                  >
                    Contact : {item.contact_number}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="edit location"
                    onClick={() => {
                    setSelectedAddress(item);
                    setEditLocation(true);
                    }}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                  {/* <IconButton aria-label="delete location">
                    <Delete fontSize="inherit" />
                  </IconButton> */}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default AddressCards;
