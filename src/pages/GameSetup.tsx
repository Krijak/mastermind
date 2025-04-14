import { Box, Button, Stack, styled, Typography } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import { useState } from "react";
import Spillrad from "../Components/Spillrad";

const GameSetup = () => {
  const [started, setStarted] = useState(true);
  return (
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
          <Typography variant="h2">VELG KODE</Typography>
          <Box mt={5}>
            <Spillrad />
          </Box>
        </>
      )}
    </PageWrapper>
  );
};

export default GameSetup;
