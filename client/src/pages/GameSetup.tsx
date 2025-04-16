import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import { useContext, useState } from "react";
import BackButton from "../Components/BackButton";
import SetCode from "../Components/SetCode";
import { CodeContext } from "../variables";
import { StyledDivider } from "../Components/StyledDivider";
import { StyledTextField } from "../Components/StyledTextField";

const ChooseCode = () => {
  return (
    <>
      <Typography variant="h2" mb={3}>
        Velg kode
      </Typography>
      <SetCode />
    </>
  );
};

const GameSetup = () => {
  const { setUseSameDevice, useSameDevice } = useContext(CodeContext);
  const [started, setStarted] = useState(false);

  return (
    <>
      <BackButton />
      <PageWrapper>
        {!started && (
          <>
            <Stack mt={5}>
              <Button
                onClick={() => {
                  setUseSameDevice(true);
                  setStarted(true);
                }}
              >
                Spill på én enhet
              </Button>
              <Button
                onClick={() => {
                  setUseSameDevice(false);
                  setStarted(true);
                }}
              >
                Spill på to enheter
              </Button>
            </Stack>
          </>
        )}
        {started && (
          <>
            {useSameDevice && <ChooseCode />}
            {!useSameDevice && (
              <>
                <ChooseCode />
                <Box width={"350px"} className="scroll-animation">
                  <StyledDivider
                    sx={{
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                  >
                    ELLER
                  </StyledDivider>
                </Box>
                <Stack alignItems={"center"} className="scroll-animation">
                  <Typography variant="h2" mb={3} mt={4}>
                    Bli med i et spill
                  </Typography>
                  <StyledTextField variant="outlined" size="small" />
                </Stack>
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default GameSetup;
