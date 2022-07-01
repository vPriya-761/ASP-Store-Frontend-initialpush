import BazarButton from "components/BazarButton";
import Image from "components/BazarImage";
import CategoryMenu from "components/categories/CategoryMenu";
import FlexBox from "components/FlexBox";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import Login from "components/sessions/Login";
import { useAppContext } from "contexts/app/AppContext";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  Badge,
  Box,
  Container,
  Dialog,
  Drawer,
  IconButton,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { layoutConstant } from "utils/constants";
import clsx from "clsx";
import Link from "next/link";
import React, {useState } from "react";
import SearchBox from "../search-box/SearchBox"; // component props interface
import Account from "./Account";
import AuthPopUp from "components/sessions";

// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  height: layoutConstant.headerHeight,
  background: theme.palette.background.paper,
  transition: "height 250ms ease-in-out",
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
}));

const Header = ({ isFixed, className }) => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showLogin, setLoginDialog] = useState(true);
  const [showSignUp, setSignup] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const toggleLogin = (value) => setLoginDialog(value);

  const toggleSignUp = (value) => setSignup(value);

  const { state } = useAppContext();
  const { cartList } = state?.cart;

  const cartHandle = (
    <Badge badgeContent={cartList?.length} color="primary">
      <Box
        component={IconButton}
        ml={2.5}
        bgcolor="grey.200"
        p={1.25}
        onClick={toggleSidenav}
      >
        <ShoppingBagOutlined />
      </Box>
    </Badge>
  );
  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <FlexBox
          alignItems="center"
          mr={1}
          minWidth="170px"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/">
            <a>
              <Image
                height={80}
                mb={0.5}
                src="/assets/images/Fabmercelogo.png"
                alt="logo"
              />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazarButton color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </BazarButton>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchBox />
        </FlexBox>

        <FlexBox
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          {(state?.authToken?.authToken === undefined ||
            state?.authToken.authToken === null ||
            state?.authToken.authToken === "") && (
            <Box
              component={IconButton}
              ml={2}
              p={1.25}
              bgcolor="grey.200"
              onClick={toggleDialog}
            >
              <PersonOutline />
            </Box>
          )}
          {state?.authToken?.authToken && (
            <Account toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} />
          )}
          {cartHandle}
        </FlexBox>
        <Dialog
          open={dialogOpen}
          fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          <AuthPopUp
            toggleDialog={toggleDialog}
            showLogin={showLogin}
            showSignUp={showSignUp}
            toggleLogin={toggleLogin}
            toggleSignUp={toggleSignUp}
          />
        </Dialog>
        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart />
        </Drawer>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
