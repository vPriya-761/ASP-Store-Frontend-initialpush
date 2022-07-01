import Card1 from "components/Card1";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useEffect, useState, useCallback } from "react";
import * as yup from "yup";
import DropDown from "components/dropdown/DropDown";
import {
  getCites,
  getProvinces,
  createLocation,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

const CheckoutForm = () => {
  const auth_token = getCookie("token");
  const { asPath, reload,router } = useRouter();
  const refreshData = useCallback(() => reload(asPath), [asPath]);
  const [countryId, setCountryID] = useState();
  const [provincesId, setProvincesId] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [countryList, setCountryList] = useState();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [locationCreated, setLocationCreated] = useState(false);

  const initialValues = {
    contact_firstname: "",
    contact_lastname: "",
    addressline1: "",
    addressline2: "",
    contact: "",
    country: "",
    city: "",
    province: "",
    zipcode: "",
    locationtype: "shipping",
    billing_contact_firstname: "",
    billing_contact_lastname: "",
    billing_addressline1: "",
    billing_addressline2: "",
    billing_contact_number: "",
    billing_country: "",
    billing_city: "",
    billing_province: "",
    billing_zipcode: "",
    billing_locationtype: "billing",
    same_as_shipping: false,
  };
  const handleCheckboxChange = (setFieldValue) => (e, _) => {
    const checked = e.currentTarget.checked;
    setSameAsShipping(checked);
    setFieldValue("same_as_shipping", checked);
  };
  // handle form submit
  const handleFormSubmit = async (values) => {
    const payload1 = {
      location_type: values.locationtype,
      city_id: values.city,
      province_id: values.province,
      country_id: values.country,
      address_line_1: values.addressline1,
      address_line_2: values.addressline2,
      postal_index_code: values.zipcode,
      contact_firstname: values.contact_firstname,
      contact_lastname: values.contact_lastname,
      contact_number: values.contact,
    };
    const payload2 = {
      contact_number: !values.same_as_shipping
        ? values.billing_contact_number
        : values.contact,
      location_type:values.billing_locationtype,
      city_id: !values.same_as_shipping ? values.billing_city : values.city,
      province_id: !values.same_as_shipping
        ? values.billing_province
        : values.province,
      country_id: !values.same_as_shipping
        ? values.billing_country
        : values.country,
      address_line_1: !values.same_as_shipping
        ? values.billing_addressline1
        : values.addressline1,
      address_line_2: !values.same_as_shipping
        ? values.billing_addressline2
        : values.addressline2,
      postal_index_code: !values.same_as_shipping
        ? values.billing_zipcode
        : values.zipcode,
      contact_firstname: !values.same_as_shipping
        ? values.billing_contact_firstname
        : values.contact_firstname,
      contact_lastname: !values.same_as_shipping
        ? values.billing_contact_lastname
        : values.contact_lastname,
    };
    createNewLocation(payload1);
    billingAddress(payload2);
  };

  const handleFunction = (param, value) => {
    if (param === "country") {
      setCountryID(value);
    }
    if (param === "province") {
      setProvincesId(value);
    }
  };

  useEffect(() => {
    if (countryId) {
      const res = getProvinces(countryId, auth_token);
      res
        .then((data) => {
          setStateList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [countryId]);
  useEffect(() => {
    if (provincesId) {
      const res = getCites(provincesId, auth_token);
      res
        .then((data) => {
          setCityList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [provincesId]);

  useEffect(() => {
    const res = getCountries(auth_token);
    res
      .then((data) => {
        setCountryList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createNewLocation = (payload1) => {
    const res = createLocation(payload1, auth_token);
    res
      .then((data) => {
        if (data.data) {
          setLocationCreated(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const billingAddress = (payload2) => {
    const res = createLocation(payload2, auth_token);
    res
      .then((data) => {
        if (data.data) {
          refreshData();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
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
            <Card1
              sx={{
                mb: "2rem",
              }}
            >
              <Typography fontWeight="600" mb={2}>
                Shipping Address
              </Typography>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"country"}
                      label={"Country"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.country && !!errors.country}
                      value={values.country || ""}
                      helperText={touched.country && errors.country}
                      list={countryList}
                      handleFunction={handleFunction}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"province"}
                      label={"State"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.province && !!errors.province}
                      value={values.province || ""}
                      helperText={touched.province && errors.province}
                      list={stateList && stateList}
                      handleFunction={handleFunction}
                      disabled={stateList === undefined}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact_firstname"
                      label="Contact Firstname"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_firstname || ""}
                      error={
                        !!touched.contact_firstname &&
                        !!errors.contact_firstname
                      }
                      helperText={
                        touched.contact_firstname && errors.contact_firstname
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact_lastname"
                      label="Contact Lastname"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_lastname || ""}
                      helperText={
                        touched.contact_lastname && errors.contact_lastname
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="addressline1"
                      label="Address Line1"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.addressline1 || ""}
                      error={!!touched.addressline1 && !!errors.addressline1}
                      helperText={touched.addressline1 && errors.addressline1}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="addressline2"
                      label="Address Line2"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.addressline2 || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"city"}
                      label={"City"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.city && !!errors.city}
                      value={values.city || ""}
                      helperText={touched.city && errors.city}
                      list={cityList && cityList}
                      handleFunction={handleFunction}
                      disabled={cityList === undefined}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact"
                      label="Phone"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ""}
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="zipcode"
                      label="ZipCode"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.zipcode || ""}
                      error={!!touched.zipcode && !!errors.zipcode}
                      helperText={touched.zipcode && errors.zipcode}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"locationtype"}
                      label={"Location Type"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.locationtype && !!errors.locationtype}
                      value={values.locationtype || ""}
                      helperText={touched.locationtype && errors.locationtype}
                      list={locationTyps}
                      handleFunction={handleFunction}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card1>

            <Card1
              sx={{
                mb: "2rem",
              }}
            >
              <Typography fontWeight="600" mb={2}>
                Billing Address
              </Typography>
              <FormControlLabel
                label="Same as shipping address"
                name="sameAsShipping"
                control={<Checkbox size="small" color="secondary" />}
                sx={{
                  mb: sameAsShipping ? "" : "1rem",
                  zIndex: 1,
                  position: "relative",
                }}
                onChange={handleCheckboxChange(setFieldValue)}
              />
              {!sameAsShipping && (
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"billing_country"}
                      label={"Country"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.billing_country && !!errors.billing_country
                      }
                      value={values.billing_country || ""}
                      helperText={
                        touched.billing_country && errors.billing_country
                      }
                      list={countryList}
                      handleFunction={handleFunction}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"billing_province"}
                      label={"State"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.billing_province && !!errors.billing_province
                      }
                      value={values.billing_province || ""}
                      helperText={
                        touched.billing_province && errors.billing_province
                      }
                      list={stateList && stateList}
                      handleFunction={handleFunction}
                      disabled={stateList === undefined}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="billing_contact_firstname"
                      label="Contact Firstname"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billing_contact_firstname || ""}
                      error={
                        !!touched.billing_contact_firstname &&
                        !!errors.billing_contact_firstname
                      }
                      helperText={
                        touched.billing_contact_firstname &&
                        errors.billing_contact_firstname
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="billing_contact_lastname"
                      label="Contact Lastname"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billing_contact_lastname || ""}
                      helperText={
                        touched.billing_contact_lastname &&
                        errors.billing_contact_lastname
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="billing_addressline1"
                      label="Address Line1"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billing_addressline1 || ""}
                      error={
                        !!touched.billing_addressline1 &&
                        !!errors.billing_addressline1
                      }
                      helperText={
                        touched.billing_addressline1 &&
                        errors.billing_addressline1
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="billing_addressline2"
                      label="Address Line2"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billing_addressline2 || ""}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"billing_city"}
                      label={"City"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.billing_city && !!errors.billing_city}
                      value={values.billing_city || ""}
                      helperText={touched.billing_city && errors.billing_city}
                      list={cityList && cityList}
                      handleFunction={handleFunction}
                      disabled={cityList === undefined}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="billing_contact_number"
                      label="Phone"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billing_contact_number || ""}
                      error={
                        !!touched.billing_contact_number &&
                        !!errors.billing_contact_number
                      }
                      helperText={
                        touched.billing_contact_number &&
                        errors.billing_contact_number
                      }
                      type={"number"}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="billing_zipcode"
                      label="ZipCode"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billing_zipcode || ""}
                      error={
                        !!touched.billing_zipcode && !!errors.billing_zipcode
                      }
                      helperText={
                        touched.billing_zipcode && errors.billing_zipcode
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DropDown
                      name={"billing_locationtype"}
                      label={"Location Type"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.billing_locationtype &&
                        !!errors.billing_locationtype
                      }
                      value={values.billing_locationtype || ""}
                      helperText={
                        touched.billing_locationtype &&
                        errors.billing_locationtype
                      }
                      list={locationTyps}
                      handleFunction={handleFunction}
                      disabled
                    />
                  </Grid>
                </Grid>
              )}
            </Card1>

            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <Link href="/cart" passHref>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    fullWidth
                  >
                    Back to Cart
                  </Button>
                </Link>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Save Address
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

const locationTyps = {
  data: [
    {
      name: "shipping",
      id: "shipping",
    },
    {
      name: "billing",
      id: "billing",
    },
  ],
};

const checkoutSchema = yup.object().shape({
  contact_firstname: yup.string().required("Please enter a contact firstname."),
  addressline1: yup.string().required("Please enter an address."),
  contact: yup
    .number()
    .required(
      "Please enter the number so we can call if there any issues with delivery."
    ),
  country: yup.string().required("Please select a country"),
  city: yup.string().required("Please select a city."),
  province: yup.string().required("Please select a state or province."),
  zipcode: yup.string().required("Please enter a ZIP or postal code."),
  locationtype: yup.string().required("Please select the location type."),
  //billing
  billing_contact_firstname: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please enter a contact firstname."),
  }),

  billing_addressline1: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please enter an address."),
  }),
  billing_contact_number: yup.number().when("same_as_shipping", {
    is: false,
    then: yup.number().required("Please enter the number."),
  }),

  billing_zipcode: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please enter a ZIP or postal code."),
  }),
  billing_city: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please select a city."),
  }),
  billing_province: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please select a state or province."),
  }),
  billing_zipcode: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please enter a ZIP or postal code."),
  }),
  billing_locationtype: yup.string().when("same_as_shipping", {
    is: false,
    then: yup.string().required("Please select the location type."),
  }),
});
// AddressEditor.layout = DashboardLayout;
export default CheckoutForm;
