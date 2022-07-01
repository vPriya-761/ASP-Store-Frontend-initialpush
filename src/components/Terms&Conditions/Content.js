import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material";
import { terms } from "./terms";

const StyledLink = styled("List")(({ theme }) => ({
  display: "block",
  cursor: "pointer",
  "&:hover": {
    color: "white",
    backgroundColor: theme.palette.primary[1000],
  },
  color: "black",
  backgroundColor: theme.palette.grey[1000],
}));

const Content = () => {
  const [addIndex, setAddIndex] = React.useState("");
  const [open, setOpen] = React.useState({ [addIndex]: false });

  const collapseOpen = (index) => {
    setAddIndex(index);
    setOpen({ [index]: !open[index] });
  };

  const handleClick = (index) => {
    switch (index) {
      case 0:
        collapseOpen(index);
        break;
      case 1:
        collapseOpen(index);
        break;
      case 2:
        collapseOpen(index);
        break;
      case 3:
        collapseOpen(index);
        break;
      case 4:
        collapseOpen(index);
        break;
      default:
        setOpen({});
    }
  };

  return (
    <List>
      {terms.map((term, index) => {
        return (
          <div key={term.heading}>
            <StyledLink>
              <ListItem onClick={() => handleClick(index)}>
                {term.addIcon}
                <ListItemText primary={term.heading} sx={{ pl: "2rem" }} />
                {open[index] ? term.expandLess : term.expandMore}
              </ListItem>
            </StyledLink>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemText sx={{ pl: 9 }}>
                  {!term.modifiedContent && !term.modifiedContentAnother && (
                      <ul style={{ listStyleType: "disc" }}>
                        {term.content?.map((data,index) => 
                        <li key={index}>{data}</li>)}
                      </ul>
                  
                  )}
                  
                  {/*additional info*/}
                  {term.modifiedContent?.map((data,index) => (
                    <div key={index}>
                      <ul style={{ listStyleType: "disc" }}>
                        {data?.productFirstType.map((first,index) => (
                          <li key={index}>{first}</li>
                        ))}
                      </ul>
                      {data?.guideLines.map((guideLine,index)=> (
                        <div key={index}>{guideLine}</div>
                      ))}
                      <ul style={{ listStyleType: "disc" }}>
                        {data?.productSecondType.map((second,index) => (
                          <li key={index}>{second}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {/*refund*/}
                  {term.another_modifiedContent?.map((modified,index) => (
                    <div ket={index}>
                      <ul style={{ listStyleType: "disc" }}>
                        {modified?.refundRules1.map((ruleOne,index) => (
                          <li key={index}>{ruleOne}</li>
                        ))}
                      </ul>
                      <h3>{modified?.heading1}</h3>
                      <ul style={{ listStyleType: "disc" }}>
                        {modified.refundRules2.map((ruleTwo,index) => (
                          <li key={index}>{ruleTwo}</li>
                        ))}
                      </ul>
                      <h3>{modified?.heading2}</h3>
                      <ul style={{ listStyleType: "disc" }}>
                        <li>{modified?.lastRules}</li>
                      </ul>
                    </div>
                  ))}
                </ListItemText>
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default Content;
