import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";
import { routes } from "../variables";
import { Peg } from "../Components/PegRow";
import { areAllCodeSlotsFilled, PegColor } from "../Components/SetCode";
import { useContext, useEffect, useState } from "react";
import { CodeContext } from "../Components/AppWrapper";

const LogoPeg = (color: PegColor) => (
  <Box height={"13px"} width={"13px"} className="scroll-animation">
    <Peg color={color.color} />
  </Box>
);

const Main = () => {
  const navigate = useNavigate();
  const { code, resetGame } = useContext(CodeContext);
  const [noExistigCode, setNoExistigCode] = useState(
    code.every((item) => item === undefined)
  );

  useEffect(() => {
    setNoExistigCode(code.every((item) => item === undefined));
  }, [code]);

  return (
    <Box className="scroll-animation">
      <PageWrapper>
        <Stack gap={3} mt={3} alignItems={"center"}>
          <Stack gap={3}>
            <Stack gap={1}>
              <LogoPeg color={"pink"} />
              <LogoPeg color="red" />
              <LogoPeg color="pink" />
              <LogoPeg color="pink" />
            </Stack>
            <Typography variant="h3" component={"h1"}>
              MASTERMIND
            </Typography>
          </Stack>
          <Stack mt={8} gap={1}>
            {noExistigCode && (
              <Button
                component={Link}
                to={routes.gameSetup}
                className="scroll-animation"
              >
                Start
              </Button>
            )}
            {!noExistigCode && (
              <>
                <Button
                  variant="text"
                  className="scroll-animation"
                  onClick={() => {
                    resetGame();
                    navigate(routes.gameSetup);
                  }}
                >
                  Nytt spill
                </Button>
                <Button
                  component={Link}
                  to={
                    areAllCodeSlotsFilled(code) ? routes.game : routes.gameSetup
                  }
                  className="scroll-animation"
                >
                  Fortsett å spille
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </PageWrapper>
    </Box>
  );
};

export default Main;
