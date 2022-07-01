import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { PersonOutline } from "@mui/icons-material";
import { useAppContext } from "contexts/app/AppContext";
import { removeCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

export default function AccountMenu({ toggleLogin, toggleSignUp }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { state, dispatch } = useAppContext();
  const LogOut = async () => {
    let token = state?.authToken?.authToken;
    try {
      const response = await axios.post(
        `${process.env.ASP_API_URL}/api/logout`,
        {},
        { headers: { Authorization: token } }
      );
      if (response.status == 200) {
        dispatch({ type: "AUTH_TOKEN", payload: null });
        removeCookies("token");
        removeCookies("sessionId");
        toggleLogin(true);
        toggleSignUp(false);
        router.push({
          pathname: "/",
          query: { user: JSON.stringify({ user: "sessionout" }) },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Box
        component={IconButton}
        ml={2}
        p={1.25}
        bgcolor="grey.200"
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Tooltip title="Account">
          <PersonOutline />
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={LogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
