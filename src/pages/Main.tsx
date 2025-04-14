import { Box, styled } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Monogram from "/monogram.png";
import Name from "/name.svg";
import AnimatedImage from "../Components/AnimatedImage";
import PageWrapper from "../Components/PageWrapper";

const images: string[] = Object.values(
  import.meta.glob("/FrontpageImages/*.{png,jpg,jpeg}", { eager: true })
).map((module) => (module as any).default);

const Main = () => {
  const location = useLocation();
  const randomImageIndex = Math.floor(Math.random() * images.length);
  const alt = "test";

  return (
    <Box className="scroll-animation">
      <PageWrapper pt={1}>
        <Box width={{ xs: "80px", sm: "100px" }}>
          <img src={Monogram} alt={alt} width={"100%"} />
        </Box>

        <StyledNavLink to={location.pathname == "/" ? "/main" : "/"}>
          <AnimatedImage
            src={images[randomImageIndex]}
            key={randomImageIndex}
            alt={alt}
            style={{
              maxWidth: "500px",
              minWidth: "100px",
            }}
            padding={8}
            paddingBottom={{ xs: 2, sm: 6 }}
            paddingTop={{ xs: 2, sm: 4 }}
          />
        </StyledNavLink>
        <Box width={{ xs: "150px", sm: "200px" }} padding={"0 4"}>
          <img src={Name} alt={alt} width={"100%"} />
        </Box>
      </PageWrapper>
    </Box>
  );
};

export default Main;

const StyledNavLink = styled(NavLink)({
  "&:focus": {
    outline: "none",
  },
});
