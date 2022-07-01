import navigations from "data/navigations";
import { Box, styled } from "@mui/material";
import React from "react";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2"; // component props interface
import { useAppContext } from "contexts/app/AppContext";
// styled component
const Wrapper = styled(Box)(({ theme, position, open }) => ({
  position: position || "unset",
  padding: "0.5rem 0px",
  left: 0,
  right: "auto",
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  borderRadius: 4,
  transform: open ? "scaleY(1)" : "scaleY(0)",
  transformOrigin: "top",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: "all 250ms ease-in-out",
  zIndex: 98,
}));

const CategoryMenuCard = ({ open, position }) => {
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };
  const {state} = useAppContext()
  return (
    <Wrapper open={open} position={position}>
      {state?.catagories?.catagoriesList.map((item, index) => {
        let MegaMenu = MegaMenu1;
        return (
          <CategoryMenuItem
            title={item.name}
            href={"/"}
            // icon={item.icon}
            caret={!!item.children}
            key={item.name}
            allData={state?.catagories?.catagoriesList}
            index={index}
          >
            <MegaMenu data={item.children || {}}/>
          </CategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};

CategoryMenuCard.defaultProps = {
  position: "absolute",
};
export default CategoryMenuCard;
