import ChevronRight from "@mui/icons-material/ChevronRight";
import { Box, MenuItem, styled } from "@mui/material";
import Link from "next/link";
import React, { useRef, useState } from "react"; // component props interface

//styled component
const Wrapper = styled(Box)(({ theme }) => ({
  "& .category-dropdown-link": {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0px 1rem",
    height: 40,
    minWidth: "278px",
    whiteSpace: "pre",
    transition: "all 250ms ease-in-out",
    "& .title": {
      paddingLeft: "0.75rem",
      flexGrow: 1,
    },
  },
  "&:hover": {
    "& > .category-dropdown-link": {
      color: theme.palette.primary.main,
      background: theme.palette.primary.light,
    },
    "& > .mega-menu": {
      display: "block",
    },
  },
}));

const CategoryMenuItem = ({ href, title, caret, children, ...rest }) => {

  const reference = useRef(null);
  const fullLength = rest?.allData?.length;
  const mouseEnterHandler = (e) => {
    const currentElement = e.currentTarget;
    currentElement.id = rest.index;
    currentElement.nextSibling.style.display = "block";

    //make display none for all the element except current element below rest.id
    for (let i = 0; i < rest.index; i++) {
      const otherElement = document.getElementById(`${i}`);
      otherElement?.nextSibling.style.display = "none";
    }

    //make display none for all the element except current element after rest.id
    for (let j = fullLength; j > rest.index; j--) {
      const otherElement = document.getElementById(`${j}`);
      otherElement?.nextSibling.style.display = "none";
    }
  }

  //make display none when window is clicked
  window.addEventListener("click", () => {
    const currentElement = document.getElementById(`${rest.index}`);
    currentElement?.nextSibling.style.display = "none";
  })

  return (
    <Wrapper>
      <Link href={href} passHref>
        <MenuItem className="category-dropdown-link" ref={reference} onMouseEnter={mouseEnterHandler}>
          {rest.icon && <rest.icon fontSize="small" color="inherit" />}
          <span className="title">{title}</span>
          {caret && <ChevronRight fontSize="small" />}
        </MenuItem>
      </Link>
      {children}
    </Wrapper>
  );
};

CategoryMenuItem.defaultProps = {
  caret: true,
};
export default CategoryMenuItem;
