import { Card, Container, styled } from "@mui/material";
import LazyImage from "components/LazyImage";

const EmptyCart = () => {

    const StyledCard = styled(Card)(() => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        flexDirection: "column",
        marginBottom: "44px"
    }));

    return (
        <>
            <StyledCard>
                <Container sx={{ textAlign: "center", paddingBottom: "20px", fontSize: "20px" }}>
                    Your shopping bag is empty. Start shopping
                </Container>
                <LazyImage
                    src="/assets/images/logos/shopping-bag.svg"
                    width={90}
                    height={100}
                />
            </StyledCard>
        </>
    )
}

export default EmptyCart;