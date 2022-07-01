import {
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogContent,
} from "@mui/material";
import * as yup from "yup";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useState, useEffect, useCallback } from "react";
import DropDown from "components/dropdown/DropDown";
import {
  getCites,
  getProvinces,
  createLocation,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const checkoutSchema = yup.object({
  contact_firstname: yup.string().required("Please enter a contact firstname."),
  addressline1: yup.string().required("Please enter an address."),
  contact: yup
    .string()
    .required(
      "Please enter the number so we can call if there any issues with delivery."
    ),
  country: yup.string().required("Please select a country"),
  city: yup.string().required("Please select a city."),
  province: yup.string().required("Please select a state or province."),
  zipcode: yup.string().required("Please enter a ZIP or postal code."),
  locationtype: yup.string().required("Please select the location type."),
});

const NewAddressForm = ({ locationtype }) => {
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
    locationtype: locationtype,
  };

  const auth_token = getCookie("token");
  const [addCardForm, setAddCardForm] = useState(false);
  const [countryId, setCountryID] = useState();
  const [provincesId, setProvincesId] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [countryList, setCountryList] = useState();
  const { asPath, replace } = useRouter();
  const refreshData = useCallback(() => replace(asPath), [asPath]);
  const { handleChange, handleSubmit, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: initialValues,
      validationSchema: checkoutSchema,
      onSubmit: (values, { resetForm }) => {
        try {
          if (values) {
            createNewLocation(values);
            setAddCardForm(false);
            resetForm(initialValues);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      },
    });
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

  const createNewLocation = (values) => {
    const payload = {
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
    const res = createLocation(payload, auth_token);
    res
      .then((data) => {
        if (data.data) {
          refreshData();
          setAddCardForm(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        sx={{
          p: "2px 20px",
        }}
        onClick={() =>
          addCardForm ? setAddCardForm(false) : setAddCardForm(true)
        }
      >
        Add New Address
      </Button>
      <Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
        <DialogContent>
          <Typography variant="h6" mb={3}>
            Add New Address Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={3.5}>
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
                      !!touched.contact_firstname && !!errors.contact_firstname
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
                    value={values.locationtype || "shipping"}
                    helperText={touched.locationtype && errors.locationtype}
                    list={locationTyps}
                    handleFunction={handleFunction}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
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

export default NewAddressForm;
