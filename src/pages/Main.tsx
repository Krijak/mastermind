import { Box, styled, Typography } from "@mui/material";
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
      <PageWrapper>
        <Typography variant="h1">Mastermind</Typography>
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
