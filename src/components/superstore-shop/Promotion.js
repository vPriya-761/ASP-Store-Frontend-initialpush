import CarouselBanner from "components/carousel-cards/CarouselBanner";
import Carousel from "components/carousel/Carousel";
import Navbar from "components/navbar/Navbar";
import { Box, Container } from "@mui/material";
import { Fragment} from "react";

const Promotion = ({promotionBanners }) => {
  return (
    <Fragment>
      <Navbar />
      <Box bgcolor="white" mb={7.5}>
        <Container
          sx={{
            py: "2rem",
          }}
        >
          <Carousel
            totalSlides={promotionBanners?.length}
            visibleSlides={1}
            infinite={true}
            autoPlay={true}
            showDots={true}
            showArrow={true}
          >
            {promotionBanners &&
              promotionBanners?.map((data, ind) => (
                <CarouselBanner carousel={data} key={ind} />
              ))}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Promotion;
