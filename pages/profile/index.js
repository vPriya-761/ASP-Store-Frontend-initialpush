import FlexBox from "components/FlexBox";
import CustomerDashboardLayout from "components/layout/CustomerDashboardLayout";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import Person from "@mui/icons-material/Person";
import { Avatar, Button, Card, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { getUserInfo } from "utils/api/profile-apis/profileAPI";
import { getCookie } from "cookies-next";
import AuthorizationPage from "components/auth-page";
import { useAppContext } from "contexts/app/AppContext";
const Profile = (props) => {
  const { dispatch } = useAppContext();
  useEffect(() => {
    dispatch({ type: "UPDATE_CART_LIST", payload: true });
  }, []);

  const { profileInfo, auth_token } = props;
  const infoList = [
    {
      title: profileInfo?.total_orders,
      subtitle: "Total Orders",
    },
    {
      title: profileInfo?.processing_orders,
      subtitle: "Processing Orders",
    },
    {
      title: profileInfo?.shipped_orders,
      subtitle: "Shipped Orders",
    },
    {
      title: profileInfo?.delivered_orders,
      subtitle: "Delivered Orders",
    },
  ];

  return (
    <CustomerDashboardLayout authToken={auth_token}>
      {auth_token ? (
        <Fragment>
          <DashboardPageHeader
            icon={Person}
            title="My Profile"
            button={
              <Link href="/profile/edit" passHref>
                <Button
                  color="primary"
                  sx={{
                    px: "2rem",
                    bgcolor: "primary.light",
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
            }
            navigation={<CustomerDashboardNavigation />}
          />

          <Box mb={4}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    p: "14px 32px",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={profileInfo?.profile_photo}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  />
                  <Box ml={1.5} flex="1 1 0">
                    <FlexBox
                      flexWrap="wrap"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div>
                        <H5 my="0px">
                          {profileInfo.first_name} {profileInfo.last_name}
                        </H5>
                      </div>
                    </FlexBox>
                  </Box>
                </Card>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid container spacing={4}>
                  {infoList.map((item) => (
                    <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          p: "1rem 1.25rem",
                        }}
                      >
                        <H3 color="primary.main" my="0px" fontWeight="600">
                          {item.title}
                        </H3>
                        <Small color="grey.600" textAlign="center">
                          {item.subtitle}
                        </Small>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <TableRow
            sx={{
              p: "0.75rem 1.5rem",
            }}
          >
            <FlexBox flexDirection="column" p={1}>
              <Small color="grey.600" mb={0.5} textAlign="left">
                First Name
              </Small>
              <span>{profileInfo?.first_name}</span>
            </FlexBox>
            <FlexBox flexDirection="column" p={1}>
              <Small color="grey.600" mb={0.5} textAlign="left">
                Last Name
              </Small>
              <span>{profileInfo?.last_name}</span>
            </FlexBox>
            <FlexBox flexDirection="column" p={1}>
              <Small color="grey.600" mb={0.5} textAlign="left">
                Email
              </Small>
              <span>{profileInfo?.email}</span>
            </FlexBox>
            <FlexBox flexDirection="column" p={1}>
              <Small color="grey.600" mb={0.5} textAlign="left">
                Phone
              </Small>
              {profileInfo?.contact_number ? (
                <span>{profileInfo?.contact_number}</span>
              ) : (
                <span> Not available</span>
              )}
            </FlexBox>
          </TableRow>
        </Fragment>
      ) : (
        <Fragment>
          <AuthorizationPage />
        </Fragment>
      )}
    </CustomerDashboardLayout>
  );
};

export async function getServerSideProps({ req, res }) {
  const auth_token = getCookie("token", { req, res }) || null;
  const profileInfo = auth_token && (await getUserInfo(auth_token));
  return {
    props: {
      profileInfo,
      auth_token,
    },
  };
}
export default Profile;
