import Card1 from "components/Card1";
import FlexBox from "components/FlexBox";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import CustomerDashboardLayout from "components/layout/CustomerDashboardLayout";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import CameraEnhance from "@mui/icons-material/CameraEnhance";
import Person from "@mui/icons-material/Person";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import DateTimePicker from "@mui/lab/DateTimePicker";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Avatar, Button, Grid, TextField, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import Link from "next/link";
import React, { Fragment } from "react";
import * as yup from "yup";
import { getUserInfo, updateProfile } from "utils/api/profile-apis/profileAPI";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const ProfileEditor = (props) => {
  const { profileInfo } = props;
  const router = useRouter();
  const auth_token = getCookie("token");
  const initialValues = {
    first_name: profileInfo?.first_name || "",
    last_name: profileInfo?.last_name || "",
    email: profileInfo?.email || "",
    contact_number: profileInfo?.contact_number || "",
  };
  const handleFormSubmit = async (values) => {
    const res = updateProfile(values, auth_token);
    res
      .then((data) => {
        if (data) router.replace("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title="Edit Profile"
        button={
          <Link href="/profile" passHref>
            <Button
              color="primary"
              sx={{
                px: "2rem",
                bgcolor: "primary.light",
              }}
            >
              Back to Profile
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar
            src={profileInfo?.profile_photo}
            sx={{
              height: 64,
              width: 64,
            }}
          />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  bgcolor: "grey.300",
                  height: "auto",
                  p: "8px",
                  borderRadius: "50%",
                }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>
          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="first_name"
                      label="First Name"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name || ""}
                      error={!!touched.first_name && !!errors.first_name}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Last Name"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name || ""}
                      error={!!touched.last_name && !!errors.last_name}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      fullWidth
                      value={values.email || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact_number"
                      label="Phone"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_number || ""}
                      error={
                        !!touched.contact_number && !!errors.contact_number
                      }
                      helperText={
                        touched.contact_number && errors.contact_number
                      }
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Birth Date"
                          value={values.birth_date}
                          maxDate={new Date()}
                          inputFormat="dd MMMM, yyyy"
                          shouldDisableTime={() => false}
                          renderInput={(props) => (
                            <TextField
                              size="small"
                              fullWidth
                              {...props}
                              error={
                                (!!touched.birth_date && !!errors.birth_date) ||
                                props.error
                              }
                              helperText={
                                touched.birth_date && errors.birth_date
                              }
                            />
                          )}
                          onChange={(newValue) =>
                            setFieldValue("birth_date", newValue)
                          }
                        />
                      </LocalizationProvider>
                    </Grid> */}
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("Email required"),
  contact_number: yup.string().required("required"),
});

export async function getServerSideProps({ req, res }) {
  const auth_token = getCookie("token", { req, res }) || null;
  const profileInfo = await getUserInfo(auth_token);
  return {
    props: {
      profileInfo,
    },
  };
}

export default ProfileEditor;
