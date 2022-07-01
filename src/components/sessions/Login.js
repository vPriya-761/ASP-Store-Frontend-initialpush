import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import FlexBox from "components/FlexBox";
import { H3, H6, Small } from "components/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Card, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import request from "utils/api/request";
import { removeCookies, setCookies, getCookie } from "cookies-next";
import { useAppContext } from "contexts/app/AppContext";
import { assignCartToCustomer } from "utils/api/checkout-apis/checkoutAPI";
import FormHelperText from "@mui/material/FormHelperText";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
    textAlign: "center",
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
  },
}));

const Login = ({ toggleDialog, toggleSignUp, toggleLogin }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const [emailerror, setEmailError] = useState("");
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const { dispatch } = useAppContext();

  const handleFormSubmit = async (values) => {
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
        handleCartItems(response.data.auth_token);
        toggleDialog();
        router.push({ pathname: "/", query: { user:JSON.stringify( "sessionin") } });
      }
    } catch (err) {
      if (err.response.status === 500) {
        setEmailError("Oops! We cannot find an account with the details.Signup to create a acoount or retry again");
      }
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
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });
  return (
    <StyledCard elevation={3} passwordVisibility={passwordVisibility}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Welcome To Fabmerce
        </H3>
        <Small
          fontWeight="600"
          fontSize="12px"
          color="grey.800"
          textAlign="center"
          mb={4.5}
          display="block"
        >
          Log in with email & password
        </Small>
       
        <FormHelperText
          sx={{fontSize:"14px" ,mb:"1rem"}}
          error={true}
        >{emailerror}
        </FormHelperText>
       
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
          mb={2}
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

        <BazarButton
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          sx={{
            mb: "1.65rem",
            height: 44,
          }}
        >
          Login
        </BazarButton>

        {/* <Box mb={2}>
          <Box width="200px" mx="auto">
            <Divider />
          </Box>

          <FlexBox justifyContent="center" mt={-1.625}>
            <Box color="grey.600" bgcolor="background.paper" px={2}>
              on
            </Box>
          </FlexBox>
        </Box> */}

        {/* <BazarButton
          className="facebookButton"
          size="medium"
          fullWidth
          sx={{
            mb: "10px",
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
        </BazarButton> */}

        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Don&apos;t have account?</Box>
          <Box
            component={"div"}
            onClick={() => {
              toggleLogin();
              toggleSignUp(true);
            }}
            sx={{ cursor: "pointer" }}
          >
            <a>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Sign Up
              </H6>
            </a>
          </Box>
        </FlexBox>
      </form>
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
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});
export default Login;
