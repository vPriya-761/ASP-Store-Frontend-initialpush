import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import FlexBox from "components/FlexBox";
import { H3, H6, Small } from "components/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Card,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import request from "utils/api/request";
import { useAppContext } from "contexts/app/AppContext";
import { assignCartToCustomer } from "utils/api/checkout-apis/checkoutAPI";
import { removeCookies, setCookies, getCookie } from "cookies-next";
const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
const StyledCard = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".content": {
    padding: "3rem 3.75rem 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "1.5rem 1rem 0px",
    },
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    "&:hover": fbStyle,
    ...fbStyle,
  },
  ".googleButton": {
    "&:hover": googleStyle,
    ...googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
    marginLeft: 0
  },
}));

const Signup = ({ toggleDialog, toggleSignUp, toggleLogin }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const { dispatch } = useAppContext();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await request.post(
        `${process.env.ASP_API_URL}/api/signup`,
        {
          email: values.email,
          first_name: values.firstname,
          last_name: values.lastname,
          password: values.password,
          password_confirmation: values.re_password,
        }
      );
      if (response.data) {
        toggleDialog();
        toggleLogin(false);
        toggleSignUp(false);
        newUserSignIN(values);
      }
    } catch (error) {
      return error;
    }
  };

  const newUserSignIN = async (values) => {
    try {
      const response = await request.post(
        `${process.env.ASP_API_URL}/api/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data) {
        setCookies("token", response.data.auth_token);
        dispatch({ type: "AUTH_TOKEN", payload: response.data.auth_token });
        handleCartItems(response?.data?.auth_token);
        toggleDialog();
        router.push({ pathname: "/", query: { user: "loggedin" } });
      }
    } catch (error) {
      return error;
    }
  };

  const handleCartItems = async (auth_token) => {
    const sessionId = getCookie("sessionId");
    if (sessionId !== null && auth_token !== null) {
      const res = assignCartToCustomer(sessionId, auth_token);
      res
        .then((data) => {
          if (data) {
            removeCookies("sessionId");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <StyledCard elevation={3} passwordVisibility={passwordVisibility}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Create Your Account
        </H3>
        <Small
          fontWeight="600"
          fontSize="12px"
          color="grey.800"
          textAlign="center"
          mb={4.5}
          display="block"
        >
          Please fill all fields to continue
        </Small>

        <BazarTextField
          mb={1.5}
          name="firstname"
          label="First Name"
          placeholder="First Name"
          variant="outlined"
          size="small"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstname || ""}
          error={!!touched.firstname && !!errors.firstname}
          helperText={touched.firstname && errors.firstname}
        />
        <BazarTextField
          mb={1.5}
          name="lastname"
          label="Last Name"
          placeholder="Last Name"
          variant="outlined"
          size="small"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastname || ""}
          error={!!touched.lastname && !!errors.lastname}
          helperText={touched.lastname && errors.lastname}
        />

        <BazarTextField
          mb={1.5}
          name="email"
          label="Email or Phone Number"
          placeholder="exmple@mail.com"
          variant="outlined"
          size="small"
          type="email"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazarTextField
          mb={1.5}
          name="password"
          label="Password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <BazarTextField
          name="re_password"
          label="Retype Password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
        />

        <FormControlLabel
          className="agreement"
          name="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement}
              sx={{ display: "none" }}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
            >
              By signing up, you agree to
              <a href="/Terms&Conditions" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />
        <BazarButton
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          sx={{
            height: 44,
          }}
        >
          Create Account
        </BazarButton>

        {/* <Box mb={2} mt={3.3}>
          <Box width="200px" mx="auto">
            <Divider />
          </Box>

          <FlexBox justifyContent="center" mt={-1.625}>
            <Box color="grey.600" bgcolor="background.paper" px={2}>
              on
            </Box>
          </FlexBox>
        </Box>

        <BazarButton
          className="facebookButton"
          size="medium"
          fullWidth
          sx={{
            height: 44,
          }}
        >
          <Image
            src="/assets/images/icons/facebook-filled-white.svg"
            alt="facebook"
          />
          <Box fontSize="12px" ml={1}>
            Continue with Facebook
          </Box>
        </BazarButton>
        <BazarButton
          className="googleButton"
          size="medium"
          fullWidth
          sx={{
            height: 44,
          }}
        >
          <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
          <Box fontSize="12px" ml={1}>
            Continue with Google
          </Box>
        </BazarButton>

        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Don&apos;t have account?</Box>
          <Link href="/login">
            <a>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Log In
              </H6>
            </a>
          </Link>
        </FlexBox> */}
      </form>
      <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
        <Box>Already have account?</Box>
        <Box
          component={"div"}
          onClick={() => {
            toggleLogin(true);
            toggleSignUp(false);
          }}
          sx={{ cursor: "pointer" }}
        >
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Sign In
            </H6>
          </a>
        </Box>
      </FlexBox>

      {/* <FlexBox justifyContent="center" bgcolor="grey.200" py={2.5}>
        Forgot your password?
        <Link href="/">
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox> */}
    </StyledCard>
  );
};

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  re_password: "",
  agreement: true,
};
const formSchema = yup.object().shape({
  firstname: yup.string().required("${path} is required"),
  lastname: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
});
export default Signup;
