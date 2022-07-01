import FlexBox from "components/FlexBox";
import FacebookFilled from "components/icons/FacebookFilled";
import InstagramFilled from "components/icons/InstagramFilled";
import TwitterFilled from "components/icons/TwitterFilled";
import YoutubeFilled from "components/icons/YoutubeFilled";
import { H3, Small, Span } from "components/Typography";
import Call from "@mui/icons-material/Call";
import Place from "@mui/icons-material/Place";
import { Avatar, Button, Card, Rating } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ShopIntroCard = ({brandinfo}) => {
  const socialLinks = [
    {
      icon: FacebookFilled,
      url: `${brandinfo?.fb_url}`,
    },
    {
      icon: TwitterFilled,
      url: `${brandinfo?.twitter_url}`,
    },
    {
      icon: YoutubeFilled,
      url: `${brandinfo?.youtube_url}`,
    },
    {
      icon: InstagramFilled,
      url: `${brandinfo?.insta_url}`,
    },
  ];
  return (
    <Card
      sx={{
        mb: "32px",
        pb: "20px",
      }}
    >
      <Box
        height="202px"
        sx={{
          height: "202px",
          background: `url(${brandinfo?.cover_photo}) center/cover`,
        }}
      />
      <FlexBox mt={-8} px={3.75} flexWrap="wrap">
        <Avatar
          src={brandinfo?.logo_photo}
          sx={{
            height: "120px",
            width: "120px",
            mr: "37px",
            border: "4px solid",
            borderColor: "grey.100",
          }}
        />

        <Box
          sx={{
            flex: "1 1 0",
            minWidth: "250px",
            "@media only screen and (max-width: 500px)": {
              marginLeft: 0,
            },
          }}
        >
          <FlexBox
            flexWrap="wrap"
            justifyContent="flex-end"
            alignItems="center"
            mt={0.375}
            mb={3}
          >

            <FlexBox my="8px">
              {socialLinks?.map((item, ind) => (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={ind}
                >
                  <item.icon
                    sx={{
                      fontSize: "1.875rem",
                      mr: ind < socialLinks?.length - 1 ? "10px" : "",
                    }}
                  />
                </a>
              ))}
            </FlexBox>
          </FlexBox>

          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
            <H3 fontWeight="600">
               {brandinfo?.name}
              </H3>
              <FlexBox alignItems="center" mb={2}>
                <Rating color="warn" size="small" value={5} readOnly />
                <Small color="grey.600" pl={1.5} display="block">
                  (45)
                </Small>
              </FlexBox>
            </Box>
          </FlexBox>
        </Box>
      </FlexBox>
    </Card>
  );
};


export default ShopIntroCard;
