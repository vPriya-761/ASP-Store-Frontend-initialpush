import React, { Fragment, useEffect, useState } from "react";
import { Collapse, Container, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { H1, H4, H5 } from "components/Typography";
import { Divider } from "@mui/material";
import FlexBox from "components/FlexBox";
import { PrivacyData } from "./PrivacyData";
import { paste } from "../../theme/themeColors";
import AddIcon from '@mui/icons-material/Add';
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";

const Privacy = () => {

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
        "@media(max-width:700px)": {
            fontSize: "2rem"
        },
        "&::selection": {
            backgroundColor: paste.black,
            color: paste.contrastText
        }
    }))

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
    }))

    const CollapsedContaier = styled("div")(() => ({
        boxShadow: "1px",
        padding: "15px",
        margin: 0,
        border: paste.collapsedContentBorder
    }));

    const StyledDivider = styled(Divider)(() => ({
        color: paste.contrastText, 
        width: "120px", 
        borderWidth: 1,
        "@media only screen and (max-width:700px)": {
            width: "100px"
        },
    }))

    const collapseContent = (index) => {
        setSaveIndex(index);
        setOpen({ [index]: !open[index] })
    }

    const selectHandler = (index) => {
        switch (index) {
            case index:
                collapseContent(index)
                break;
            default:
                setOpen({});
        }
    }

    return (
        <Fragment>
            <StyledContainer sx={{ height: "221px", mt: "-2rem" }}>
                <StyledHeader selected={true}>PRIVACY POLICY</StyledHeader>
                <FlexBox sx={{ justifyContent: "center", py: 3 }}>
                    <StyledDivider />
                </FlexBox>
            </StyledContainer>
            <List sx={{ padding: "10px", mt: "50px", mb: "100px" }}>
                {PrivacyData?.map((data, index) => <div key={data.id}>
                    <StyledListItemButton selected={open[index]} onClick={() => { selectHandler(index) }}>
                        <AddIcon />
                        <ListItemText sx={{ pl: "5px" }}>{data?.heading}</ListItemText>
                        {open[index] ? <ExpandMore /> : <ExpandLess />}
                    </StyledListItemButton>
                    {(!data?.modifiedContent && !data?.complaints) && <Collapse in={open[index]} timeout="auto" unmountOnExit>
                        <CollapsedContaier>
                            {data?.content}
                        </CollapsedContaier>
                    </Collapse>}
                    {data?.modifiedContent && <Collapse in={open[index]}>
                        <CollapsedContaier>
                            {data?.modifiedContent?.map(personalData => <div key={personalData}>
                                <H4 sx={{ mb: "20px", fontSize: "1.3333333333333rem" }}>{personalData?.contentHeading}</H4>
                                <ol style={{ paddingLeft: "25px" }}>
                                    {personalData?.nestedContent?.map(list => <li key={list}>{list}</li>)}
                                </ol>
                                <p>{personalData?.finalLine}</p>
                            </div>)}
                        </CollapsedContaier>
                    </Collapse>}
                    {data?.complaints && <Collapse in={open[index]} timeout="auto" unmountOnExit>
                        <CollapsedContaier>
                            {data?.complaints?.nestedContent?.map((complaint, complaintIndex) => 
                                <H5 key={complaint} sx={complaintIndex === 1 && { mb: "20px" }}>
                                    {complaint}
                                </H5>)}
                        </CollapsedContaier>
                    </Collapse>}
                </div>)}
            </List>
        </Fragment>
    )
}

export default Privacy;