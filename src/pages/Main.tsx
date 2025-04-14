import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import Monogram from "/monogram.png";
import Name from "/name.svg";
import AnimatedImage from "../Components/AnimatedImage";
import PageWrapper from "../Components/PageWrapper";
import { Peg } from "../Components/Spillrad";
import { routes } from "../variables";

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
        <Stack gap={3}>
          <Box>
            <Box height={"20px"} width={"20px"}>
              <Peg color="pink" />
            </Box>
            <Box height={"20px"} width={"20px"}>
              <Peg color="red" />
            </Box>
            <Box height={"20px"} width={"20px"}>
              <Peg color="pink" />
            </Box>
            <Box height={"20px"} width={"20px"}>
              <Peg color="pink" />
            </Box>
          </Box>
          <Typography variant="h3" component={"h1"}>
            MASTERMIND
          </Typography>
          <Button component={Link} to={routes.gameSetup}>
            Start
          </Button>
        </Stack>
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
