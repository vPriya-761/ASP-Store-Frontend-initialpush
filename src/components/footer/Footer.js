import BazarIconButton from "components/BazarIconButton";
import Image from "components/BazarImage";
import Facebook from "components/icons/Facebook";
import Google from "components/icons/Google";
import Instagram from "components/icons/Instagram";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import { Paragraph } from "components/Typography";
import { Box, Container, Grid, styled } from "@mui/material";
import Link from "next/link";
import React from "react";
import FlexBox from "../FlexBox"; // styled component
import Bottom from "./Bottom";


const StyledLink = styled("a")(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: "0.3rem 0rem",
  margin:"0rem",
  color: theme.palette.grey[500],
  cursor: "pointer",
  borderRadius: 4,
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));

const Footer = () => {
  return (
   <>
    <footer>
      <Box bgcolor="#0c0e30">
        <Container
          sx={{
            p: "1rem",
            color: "white",
            width:"100%"
          }}
        >
          <Box py={10} overflow="hidden" width="100%">
            <Grid container spacing={3} sx={{
           borderBottom:"1px solid white",
           width:"100%"
            }}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      mb={2.5}
                      src={
                        "https://www.fabmerce.com/wp-content/uploads/2021/12/looo.png"
                      }
                      alt="logo"
                      height={50}
                    />
                  </a>
                </Link>

                <Paragraph mb={1} color="grey.500">
                  Fabmerce is a global marketplace for unique and creative
                  goods. It's home to a universe of products like fashion and
                  lifestyle
                </Paragraph>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  About Us
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => {
                    return (
                      <Link href={`/${item}`} key={ind} passHref>
                        <StyledLink>{item}</StyledLink>
                      </Link>
                    )
                  })}
                </div>
              </Grid>

              {/*<Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  lineHeight="1"
                  color="white"
                >
                  Customer Care
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href={`/${item}`} key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                  </div>
              </Grid>*/}

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"

                >
                  Contact Us
                </Box>
                <Box py={0.6} color="grey.500">
                  Koyembedu, Chennai, Tamil Nadu.
                </Box>
                <Box py={0.6} color="grey.500">
                  Email: help@fabmerce.com
                </Box>
                <Box py={0.6} mb={2} color="grey.500">
                  Phone: +91 7092134246
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <BazarIconButton
                        m={0.5}
                        bgcolor="rgba(0,0,0,0.2)"
                        fontSize="12px"
                        padding="10px"
                      >
                        <item.icon fontSize="inherit" />
                      </BazarIconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          <Bottom/>
          </Box>
        </Container>  
      </Box>
    </footer>
   </>
  );
};

const aboutLinks = [
  "Returns&Refunds",
  "Terms&Conditions",
  "PrivacyPolicy",
];
const customerCareLinks = [
  "HelpCenter",
  "Careers",
  "HowtoBuy",
  "OurStores",
  "OurCares",
  "TrackYourOrder",
  "Corporate&BulkPurchasing",
];
const iconList = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/FabmerceOfficial",
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCmhTyMZXKBAce0E73gU8DbA/featured",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/fabmerce/",
  },
];
export default Footer;
