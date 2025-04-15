import { Box, Button, Stack, styled } from "@mui/material";
import { colors, Colors } from "./SetCode";
import { Peg } from "./PegRow";

type PegColorsType = {
  setActiveColorAndAssignSlots: (color: Colors) => void;
};

export const PegColors = ({ setActiveColorAndAssignSlots }: PegColorsType) => {
  return (
    <Stack flexDirection="row" className="scroll-animation">
      {colors.map((color, index) => (
        <PegSlotWrapper key={index}>
          <StyledButton
            onClick={() => setActiveColorAndAssignSlots(color)}
            variant="text"
          >
            <Peg color={color} />
          </StyledButton>
        </PegSlotWrapper>
      ))}
    </Stack>
  );
};

export default PegColors;

const PegSlotWrapper = styled(Box)({
  width: "42px",
  height: "42px",
});

const StyledButton = styled(Button)({
  width: "100%",
  height: "100%",
  padding: 0,
  minWidth: "unset",
});
