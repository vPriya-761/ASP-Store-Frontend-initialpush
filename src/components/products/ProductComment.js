import BazarAvatar from "components/BazarAvatar";
import BazarRating from "components/BazarRating";
import FlexBox from "components/FlexBox";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { Box } from "@mui/material";
import { getDateDifference } from "utils/utils";
import React from "react";

const ProductComment = ({imgUrl, rating, review_text, reviewer_name, survey_completed_on }) => {
  return (
    <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        <BazarAvatar src={imgUrl} height={48} width={48} />
        <Box ml={2}>
          <H5 mb={0.5}>{reviewer_name}</H5>
          <FlexBox alignItems="center">
            <BazarRating value={rating} color="warn" readOnly />
            <H6 mx={1.25}>{rating}</H6>
            <Span>{getDateDifference(survey_completed_on)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700">{review_text}</Paragraph>
    </Box>
  );
};

export default ProductComment;
