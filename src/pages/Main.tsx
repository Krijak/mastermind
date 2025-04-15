import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";
import { routes } from "../variables";
import { Peg } from "../Components/PegRow";
import { PegColor } from "../Components/SetCode";

const LogoPeg = (color: PegColor) => (
  <Box height={"20px"} width={"20px"} className="scroll-animation">
    <Peg color={color.color} />
  </Box>
);

const Main = () => {
  return (
    <Box className="scroll-animation">
      <PageWrapper>
        <Stack gap={3} mt={3}>
          <Box>
            <LogoPeg color={"pink"} />
            <LogoPeg color="red" />
            <LogoPeg color="pink" />
            <LogoPeg color="pink" />
          </Box>
          <Typography variant="h3" component={"h1"}>
            MASTERMIND
          </Typography>
          <Button
            component={Link}
            to={routes.gameSetup}
            className="scroll-animation"
          >
            Start
          </Button>
        </Stack>
      </PageWrapper>
    </Box>
  );
};

export default Main;
