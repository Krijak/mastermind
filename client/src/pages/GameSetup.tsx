import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import PageWrapper from "../Components/PageWrapper";
import { useContext, useState } from "react";
import BackButton from "../Components/BackButton";
import SetCode from "../Components/SetCode";
import { CodeContext, roomidLength, routes } from "../variables";
import { StyledDivider } from "../Components/StyledDivider";
import { StyledTextField } from "../Components/StyledTextField";
import { useNavigate } from "react-router";

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
  const { setUseSameDevice, useSameDevice, setRoomId } =
    useContext(CodeContext);
  const navigate = useNavigate();
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
      <PageWrapper>
        {!started && (
          <>
            <Stack mt={5} className="scroll-animation">
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
                  <StyledTextField
                    variant="outlined"
                    size="small"
                    value={inputRoomid}
                    onChange={(e) => setinputRoomId(e.target.value)}
                  />

                  {inputRoomid.length == roomidLength && (
                    <Box mt={5} className="scroll-animation">
                      <Button
                        onClick={
                          () => setRoomId(inputRoomid)
                          // navigate(routes.game + `/${inputRoomid}`)
                        }
                      >
                        OK, lets go{" "}
                        <ArrowForwardIosIcon
                          sx={{ fontSize: "0.8em", marginLeft: 1 }}
                        />
                      </Button>
                    </Box>
                  )}
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
