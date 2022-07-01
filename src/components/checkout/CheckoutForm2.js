/* eslint-disable react-hooks/exhaustive-deps */
import Card1 from "components/Card1";
import FlexBox from "components/FlexBox";
import { H6, Paragraph } from "components/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import NewAddressForm from "./NewAddressForm";
import EditAddressForm from "./EditAddressForm"; // date types
import { useAppContext } from "contexts/app/AppContext";
import PaymentForm from "components/payment/PaymentForm";

const CheckoutForm2 = ({ locationsList }) => {
  const [shippingId, setShippingId] = useState();
  const { state, dispatch } = useAppContext();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selected, setSelected] = useState(false);

  const editHandler = (value) => {
    const data = locationsList.find((item) => item.location_id === value);
    setSelected(data);
    openEditForm ? setOpenEditForm(false) : setOpenEditForm(true);
  };

  const billingAddress = () => {
    const data = locationsList.find((item) => item.location_type === "BILLING");
    dispatch({ type: "BILLING_ID", payload: data?.location_id });
  };

  const setIds = (addressType, id) => {
    if (addressType === "shipping") {
      setShippingId(id);
      dispatch({ type: "SHIPPING_ID", payload: id });
    }
  };

  useEffect(() => {
    billingAddress();
  }, []);

  return (
    <Fragment>
      <Card1
        sx={{
          mb: "1.5rem",
        }}
      >
        <FlexBox mb={3.5} alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="center">
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                color: "primary.text",
                mr: "0.875rem",
                height: 32,
                width: 32,
              }}
            >
              1
            </Avatar>
            <Typography fontSize="20px">Delivery Address</Typography>
          </FlexBox>

          <NewAddressForm locationtype={"shipping"} />
        </FlexBox>

        <Typography mb={1.5}>Delivery Address</Typography>
        <Grid container spacing={3}>
          {locationsList
            ?.filter((i) => i?.location_type === "SHIPPING")
            .map((item, ind) => (
              <Grid item md={4} sm={6} xs={12} key={ind}>
                <Card
                  sx={{
                    backgroundColor: "grey.100",
                    p: "1rem",
                    position: "relative",
                    boxShadow: "none",
                    border: "1px solid",
                    cursor: "pointer",
                    borderColor:
                      item.location_id === shippingId
                        ? "primary.main"
                        : "transparent",
                  }}
                  onClick={() => {
                    setIds("shipping", item.location_id);
                  }}
                >
                  <FlexBox
                    justifyContent="flex-end"
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                    }}
                  >
                    {selected && (
                      <EditAddressForm
                        openEditForm={openEditForm}
                        setOpenEditForm={setOpenEditForm}
                        selected={selected}
                      />
                    )}
                    <IconButton
                      size="small"
                      sx={{
                        mr: 1,
                      }}
                      onClick={() => editHandler(item.location_id)}
                    >
                      <ModeEditOutlineIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </IconButton>
                    {/* <IconButton
                        onClick={() => deleteAddress(item.location_id)}
                        color="error"
                        size="small"
                      >
                        <DeleteOutlineIcon
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton> */}
                  </FlexBox>
                  <H6 mb={0.5}>
                    {item?.contact_firstname} {item?.contact_lastname}{" "}
                  </H6>
                  <Paragraph color="grey.700">
                    {item?.address_line_1} {item?.address_line_2}
                  </Paragraph>
                  <Paragraph color="grey.700">{item?.city}</Paragraph>
                  {item?.province && (
                    <Paragraph color="grey.700">{item?.province}</Paragraph>
                  )}
                  <Paragraph color="grey.700">
                    {item?.country} , {item?.postal_index_code}
                  </Paragraph>
                  <Paragraph color="grey.700">{item?.contact_number}</Paragraph>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Card1>

      <Card1
        sx={{
          mb: "1.5rem",
        }}
      >
        <FlexBox alignItems="center" mb={3.5}>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              color: "primary.text",
              mr: "0.875rem",
              height: 32,
              width: 32,
            }}
          >
            3
          </Avatar>
          <Typography fontSize="20px">Payment Details</Typography>
        </FlexBox>
        <PaymentForm orderType={"buy-now"} />
      </Card1>
    </Fragment>
  );
};

export default CheckoutForm2;
