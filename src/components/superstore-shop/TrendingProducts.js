import Link from "next/link";
import { Box } from "@mui/material";
import FlexBox from "components/FlexBox";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import BazarCard from "components/BazarCard";
import LazyImage from "components/LazyImage";
import GiftBox from "components/icons/GiftBox";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";

const TrendingProducts = ({ trendingProduct, format, currency }) => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  const formatter = new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <CategorySectionCreator
      icon={<GiftBox />}
      title="Trending Products"
      seeMoreLink="/product/search/trending-products"
    >
      <Box my="-0.25rem">
        <Carousel
          totalSlides={trendingProduct?.data?.count}
          visibleSlides={visibleSlides}
        >
          {trendingProduct?.data?.map((item) => (
            <Box py={0.5} key={item.id}>
              <BazarCard
                sx={{
                  p: "1rem",
                }}
              >
                <Link
                  key={item.id}
                  href={{
                    pathname: `/product/${item.id}`,
                    query: {
                      brnd: JSON.stringify({
                        branName: item.brand_name,
                        brandId: item.brand_id,
                      }),
                    },
                  }}
                >
                  <a>
                    <HoverBox borderRadius="8px" mb={1}>
                      <LazyImage
                        src={item.profile_photo}
                        width={100}
                        height={100}
                        layout="responsive"
                        alt={item.title}
                        priority
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb={0.5} ellipsis>
                      {item.title}
                    </H4>

                    <FlexBox>
                      <H4
                        fontWeight="600"
                        fontSize="14px"
                        color="primary.main"
                        mr={1}
                      >
                        {formatter.format(item.min_price).replace(/^(\D+)/, '$1 ')}
                      </H4>
                      <H4 fontWeight="600" fontSize="14px" color="grey.600">
                        <del>
                          {formatter.format(item.max_price).replace(/^(\D+)/, '$1 ')}
                        </del>
                      </H4>
                    </FlexBox>
                  </a>
                </Link>
              </BazarCard>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default TrendingProducts;
