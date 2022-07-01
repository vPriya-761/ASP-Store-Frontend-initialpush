import React, { Fragment, useEffect, useState } from "react";
import { Collapse, Container, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { H1, H4, H5 } from "components/Typography";
import { Divider } from "@mui/material";
import FlexBox from "components/FlexBox";
import { paste, refund } from "../../theme/themeColors";
import { RefundData } from "./RefundData";
import AddIcon from '@mui/icons-material/Add';
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";

const ReturnPolicy = () => {

    const [saveIndex, setSaveIndex] = useState("");
    const [open, setOpen] = useState({
        [saveIndex]: false
    });

    const StyledContainer = styled(Container)(() => ({
        width: "100%",
        backgroundImage: paste.headerBackgroundColor,
        opacity: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }));

    const StyledHeader = styled(H1)(() => ({
        color: paste.contrastText,
        textAlign: "center",
        fontSize: "4.4rem",
        "@media only screen and (max-width:700px)": {
            fontSize: "2rem"
        },
        "&::selection": {
            backgroundColor: paste.black,
            color: paste.contrastText
        }
    }));

    const StyledListItemButton = styled(ListItemButton)(() => ({
        boxShadow: "initial",
        backgroundColor: paste.headerColor,
        border: paste.buttonBorder,
        "&:hover": {
            backgroundImage: paste.hoverSelectedColor,
            color: paste.contrastText
        },
        "&.Mui-selected": {
            backgroundImage: paste.hoverSelectedColor,
            color: paste.contrastText
        }
    }));

    const CollapsedContaier = styled("div")(() => ({
        boxShadow: "1px",
        padding: "15px",
        margin: 0,
        border: paste.collapsedContentBorder
    }));

    const StyledDivider = styled(Divider)(() => ({
        color: paste.contrastText,
        borderWidth: 1,
        width: "120px",
        "@media only screen and (max-width:700px)": {
            width: "100px"
        },
    }));

    const StyledAnchor = styled("a")(() => ({
        color: refund.anchor,
        "&:hover": {
            color: refund.anchorHover
        }
    }));

    const collapseContent = (index) => {
        setSaveIndex(index);
        setOpen({ [index]: !open[index] })
    };

    const selectHandler = (index) => {
        switch (index) {
            case index:
                collapseContent(index)
                break;
            default:
                setOpen({});
        }
    };

    return (
        <Fragment>
            <StyledContainer sx={{ height: "221px", mt: "-2rem" }} maxWidth="xl">
                <StyledHeader selected={true}>RETURN POLICY</StyledHeader>
                <FlexBox sx={{ justifyContent: "center", py: 3 }}>
                    <StyledDivider />
                </FlexBox>
            </StyledContainer>
            <List sx={{ padding: "10px", mt: "50px", mb: "100px" }}>
                {RefundData?.map((data, index) => <div key={data.id}>
                    <StyledListItemButton selected={open[index]} onClick={() => { selectHandler(index) }}>
                        <AddIcon />
                        <ListItemText sx={{ pl: "5px" }}>{data?.heading}</ListItemText>
                        {open[index] ? <ExpandMore /> : <ExpandLess />}
                    </StyledListItemButton>
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                        <CollapsedContaier>
                            {data?.content?.exchange?.map((exchangeData, index) =>
                                <div style={{ marginBottom: data?.content?.exchange?.length - 1 === index && "25px" }}>
                                    {exchangeData}
                                </div>
                            )}
                            <div style={{marginBottom: "25px"}}>
                                {data?.content?.exchangeAnchor?.map((anchorData, anchorIndex) => <span key={anchorData}>
                                    {anchorIndex !== 1 ? <span>{anchorData}</span> : <StyledAnchor href={`${anchorData}`}>{anchorData}{"."}</StyledAnchor>}
                                    {" "}
                                </span>)}
                            </div>
                            <ol>
                                {data?.content?.exchangeRules?.map(rules => <li style={{ marginBottom: "25px", marginLeft: "-25px" }}>{rules}</li>)}
                            </ol>
                            {data?.giftCard && <div style={{ marginBottom: "20px" }}>{data?.giftCard}</div>}
                        </CollapsedContaier>
                    </Collapse>
                </div>)}
            </List>
        </Fragment>
    )
}

export default ReturnPolicy;