import { useContext, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { Box, Button, Stack } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow from "../Components/PegRow";
import { CodeContext } from "../Components/AppWrapper";
import PegColors from "../Components/PegColors";
import { styled } from "@mui/system";

const Game = () => {
  const [isCodeGuesser, setIsCodeGuesser] = useState(true);
  const [slots, setSlots] = useState(Array(10).fill(Array(4).fill(undefined)));
  const { code } = useContext(CodeContext);

  return (
    <>
      <BackButton />
      <PageWrapper mt={0}>
        {isCodeGuesser && (
          <Stack alignItems={"center"}>
            {slots.map((row, i) => (
              <PegRow
                key={i}
                slots={row}
                setActiveSlotAndAssignColors={() => setSlots(slots)}
              />
            ))}
            <CodeOrColorRow>
              <PegColors setActiveColorAndAssignSlots={() => console.log()} />
            </CodeOrColorRow>
          </Stack>
        )}
        {!isCodeGuesser && (
          <Stack>
            {slots.map((row, i) => (
              <PegRow
                key={i + "adkjlf"}
                slots={row}
                setActiveSlotAndAssignColors={() => console.log(i)}
              />
            ))}
            <CodeOrColorRow className="scroll-animation">
              <PegRow slots={code} shadow />
            </CodeOrColorRow>
          </Stack>
        )}
        <Box mt={3}>
          <Button onClick={() => setIsCodeGuesser(!isCodeGuesser)}>
            {isCodeGuesser ? "Jeg er ferdig å gjette" : "jeg er ferdig å rette"}
          </Button>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Game;

const CodeOrColorRow = styled(Box)({
  marginTop: "40px",
  height: "70px",
});
