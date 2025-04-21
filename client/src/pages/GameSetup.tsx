import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import PageWrapper from "../Components/PageWrapper";
import { useContext, useState } from "react";
import BackButton from "../Components/BackButton";
import SetCode from "../Components/SetCode";
import { CodeContext, roomidLength } from "../variables";
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

export const JoinGame = ({
  inputRoomid,
  setinputRoomId,
  setRoomId,
}: {
  inputRoomid: string;
  setinputRoomId: (inputRoomid: string) => void;
  setRoomId: (inputRoomid: string) => void;
}) => {
  return (
    <Stack alignItems={"center"} className="scroll-animation">
      <Typography variant="h2" mb={3} mt={4}>
        Bli med i et spill
      </Typography>
      <StyledTextField
        variant="outlined"
        size="small"
        value={inputRoomid}
        sx={{ ".MuiInputBase-input": { fontSize: "1rem" } }}
        onChange={(e) => setinputRoomId(e.target.value)}
      />
      <Collapse in={inputRoomid.length == roomidLength}>
        <Box mt={3} className="scroll-animation">
          <Button
            onClick={
              () => setRoomId(inputRoomid)
              // navigate(routes.game + `/${inputRoomid}`)
            }
          >
            OK, lets go{" "}
            <ArrowForwardIosIcon sx={{ fontSize: "0.8em", marginLeft: 1 }} />
          </Button>
        </Box>
      </Collapse>
    </Stack>
  );
};

const GameSetup = () => {
  const { setUseSameDevice, useSameDevice, setRoomId } =
    useContext(CodeContext);
  const [started, setStarted] = useState(false);
  const [inputRoomid, setinputRoomId] = useState("");

  return (
    <>
      {!started ? (
        <BackButton />
      ) : (
        <Box mt={3} ml={3}>
          <Button onClick={() => setStarted(false)}>
            <Typography>
              <ArrowBackIosIcon sx={{ fontSize: "0.8em" }} />
            </Typography>
          </Button>
        </Box>
      )}
      <PageWrapper {...(started && { mt: 3 })}>
        {!started && (
          <>
            <Stack mt={5} className="scroll-animation" gap={1}>
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
                <JoinGame
                  inputRoomid={inputRoomid}
                  setRoomId={setRoomId}
                  setinputRoomId={setinputRoomId}
                />
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default GameSetup;
