import { Box, Button, Typography } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import { useState } from "react";
import BackButton from "../Components/BackButton";
import SetCode from "../Components/SetCode";

const GameSetup = () => {
  const [started, setStarted] = useState(true);
  return (
    <>
      <BackButton />
      <PageWrapper>
        {!started && (
          <>
            <Typography>Setup</Typography>
            <Box mt={5}>
              <Button variant="outlined" onClick={() => setStarted(true)}>
                Start
              </Button>
            </Box>
          </>
        )}
        {started && (
          <>
            <Typography variant="h2" mb={4}>
              VELG KODE
            </Typography>
            <SetCode />
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default GameSetup;
