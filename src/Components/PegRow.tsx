import { Box, Button, Stack, styled } from "@mui/material";
import { Colors, PegColor } from "./SetCode";

type PegRowType = {
  setActiveSlotAndAssignColors?: (index: number) => void;
  slots: (Colors | undefined)[];
  shadow?: boolean;
};

export const PegRow = ({
  setActiveSlotAndAssignColors,
  slots,
  shadow,
}: PegRowType) => {
  return (
    <Koderad shadow={shadow}>
      {slots.map((slot, index) => (
        <PegSlotWrapper key={index}>
          <StyledButton
            disabled={!setActiveSlotAndAssignColors}
            onClick={() =>
              setActiveSlotAndAssignColors &&
              setActiveSlotAndAssignColors(index)
            }
            variant="text"
          >
            {slot ? <Peg color={slot} /> : <EmptySlot className="test" />}
          </StyledButton>
        </PegSlotWrapper>
      ))}
    </Koderad>
  );
};

export default PegRow;

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

const Koderad = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ shadow?: boolean }>(({ shadow }) => ({
  flexDirection: "row",
  borderRadius: "30px",
  padding: "7px",
  boxShadow: shadow
    ? "inset 2px 3px 4px 0 lightgrey,inset -2px -3px 4px 0 white"
    : "",
}));

export const Peg = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<PegColor>(({ color }) => ({
  backgroundColor: color,
  height: "50%",
  width: "50%",
  borderRadius: "50%",
}));

const EmptySlot = styled("div")({
  backgroundColor: "lightgrey",
  height: "50%",
  width: "50%",
  borderRadius: "50%",
});
