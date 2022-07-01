import FlexBox from "components/FlexBox";
import React, { useState, Fragment, useEffect } from "react";
import { Box, Card, Dialog, useMediaQuery, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { H3, H6, Small } from "components/Typography";
import { useTheme } from "@mui/material/styles";
import Image from "components/BazarImage";
import Progress from "components/stepper/Progress";
import BazarButton from "components/BazarButton";
import NavbarLayout from "components/layout/NavbarLayout";
import Link from "next/link";
import CheckIcon from "@mui/icons-material/Check";
import { green, red } from "@mui/material/colors";
import { useRouter } from "next/router";
import { Cancel } from "@mui/icons-material";

const StyledCard = styled(({ children, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme }) => ({
  width: 650,
  height: 415,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".content": {
    textAlign: "center",
    padding: "3rem 3.75rem 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "1.5rem 1rem 0px",
    },
  },
}));

const OrderStatus = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [dialogOpen, setDialogOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = router?.query;
  const orderStatus = parseInt(params?.status);
  const message = params?.msg;

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  useEffect(() => {
    if (orderStatus===200) {
      setLoading(false);
    }
  }, []);

  return (
    <Dialog
      open={dialogOpen}
      fullWidth={isMobile}
      scroll="body"
      maxWidth="100%"
    >
      <StyledCard>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          mr={1}
          minWidth="170px"
          sx={{
            display: {
              xs: "flex",
              md: "flex",
            },
          }}
        >
          <Image
            height={80}
            mb={0.5}
            src="/assets/images/Fabmercelogo.png"
            alt="logo"
          />
        </FlexBox>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          mr={1}
          minWidth="170px"
          mb={4.5}
          sx={{
            display: {
              xs: "flex",
              md: "flex",
            },
          }}
        >
          {orderStatus === 200? (
            <div>
              {message === "success" ? (
                <CheckIcon
                  sx={{
                    width: 50,
                    height: 50,
                    color: green[500],
                    fontWeight: 700,
                  }}
                />
              ) : (
                <Cancel  sx={{
                    width: 70,
                    height: 70,
                    color: red[400],
                    fontWeight: 700,
                  }} />
              )}
            </div>
          ) : (
            <Progress loading={loading} />
          )}
        </FlexBox>

        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          mr={1}
          minwidth="190px"
          sx={{
            display: {
              xs: "flex",
              md: "flex",
              textAlign: "center",
            },
          }}
        >
          {orderStatus !== 200 && (
            <H6>
              Your order is Proccessing. Please don't close or don't click back
              button / refresh the page.
            </H6>
          )}
          {message === "success" && (
            <H6
              fontWeight="600"
              fontSize="12px"
              color="grey.800"
              textAlign="center"
              display="block"
              mb={4.5}
            >
              Your order is confirmed. You will receive an order
              confirmationemail/ SMS shortly with the expecteddelivery time for
              your item
            </H6>
          )}
          {message === "cancel" && (
            <H6
              fontWeight="600"
              fontSize="12px"
              color="grey.800"
              textAlign="center"
              display="block"
              mb={4.5}
            >
              Your order is was canceled. Please Try again.
            </H6>
          )}
        </FlexBox>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Link href="/" passHref>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  fullWidth
                >
                  Continue Shopping
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                onClick={() => {
                  router.push("/orders");
                }}
              >
                View Orders
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledCard>
    </Dialog>
  );
};

export default OrderStatus;
