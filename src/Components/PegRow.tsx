import { Box, Button, Stack, styled } from "@mui/material";
import { Colors, PegColor } from "./SetCode";

type PegRowType = {
  setActiveSlotAndAssignColors?: (index: number, rowNumber: number) => void;
  slots: (Colors | undefined)[];
  shadow?: boolean;
  rowNumber: number;
  activeIndex?: number;
  notVisible?: boolean;
};

export type PinColors = "black" | "white";
type PegPinColors = { colors?: PinColors };

type PegPinRowType = {
  setActiveSlotAndAssignColors?: (index: number) => void;
  slots: (PinColors | undefined)[];
  shadow?: boolean;
};

export const PegPinsRow = ({
  slots,
  setActiveSlotAndAssignColors,
}: PegPinRowType) => {
  return (
    <PinWrapper>
      {slots.map((slot, index) => (
        <Stack key={index} width={"15px"} height={"15px"}>
          <StyledButton
            disabled={!setActiveSlotAndAssignColors}
            sx={{ padding: "2px" }}
          >
            {slot ? <PinPeg color={slot} /> : <EmptySlot className="test" />}
          </StyledButton>
        </Stack>
      ))}
    </PinWrapper>
  );
};

export const PegRow = ({
  setActiveSlotAndAssignColors,
  slots,
  shadow,
  rowNumber,
  activeIndex,
  notVisible,
}: PegRowType) => {
  return (
    <Koderad shadow={shadow}>
      {slots.map((slot, index) => (
        <PegSlotWrapper key={index}>
          <StyledButton
            disabled={!setActiveSlotAndAssignColors}
            onClick={() =>
              setActiveSlotAndAssignColors &&
              setActiveSlotAndAssignColors(index, rowNumber)
            }
            variant="text"
          >
            {slot ? (
              <Peg
                color={slot}
                notVisible={notVisible ? notVisible : undefined}
              />
            ) : (
              <EmptySlot isActive={activeIndex == index} className="test" />
            )}
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
  padding: "10px",
  minWidth: "unset",
});

const Koderad = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "shadow",
})<{ shadow?: boolean }>(({ shadow }) => ({
  flexDirection: "row",
  borderRadius: "30px",
  padding: "7px",
  boxShadow: shadow
    ? "inset 2px 3px 4px 0 lightgrey,inset -2px -3px 4px 0 white"
    : "",
}));

const PinWrapper = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  width: "30px",
  height: "30px",
});

export const Peg = styled("div", {
  shouldForwardProp: (prop) => prop !== "notVisible",
})<PegColor & { notVisible?: boolean }>(({ color, notVisible }) => ({
  backgroundColor: notVisible ? "transparent" : color,
  transition: "background-color 0.2s ease",
  height: "100%",
  width: "100%",
  borderRadius: "50%",
}));

const PinPeg = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<PegPinColors>(({ color }) => ({
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  background: `radial-gradient( circle at 30% 30%,${color},${
    color == "white" ? "lightgrey" : "black"
  })`,
}));

const EmptySlot = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive }) => ({
  backgroundColor: "lightgrey",
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  ...(isActive && { outline: "1px solid grey", outlineOffset: "4px" }),
}));
