import { PropsWithChildren, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Box, Button, Stack, styled, Typography } from "@mui/material";

type Colors = "pink" | "red" | "green" | "purple" | "orange" | "black";

type PegColor = {
  color: Colors;
};
type SpillradType = {
  slot1startColor?: Colors;
  slot2startColor?: Colors;
  slot3startColor?: Colors;
  slot4startColor?: Colors;
} & PropsWithChildren;

export const Spillrad = ({
  slot1startColor,
  slot2startColor,
  slot3startColor,
  slot4startColor,
}: SpillradType) => {
  const initialColors = [
    slot1startColor,
    slot2startColor,
    slot3startColor,
    slot4startColor,
  ];
  const [slots, setSlots] = useState<(Colors | undefined)[]>(initialColors);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);

  const colors: Colors[] = [
    "pink",
    "red",
    "green",
    "purple",
    "orange",
    "black",
  ];

  useEffect(() => {
    setAllSlotsAreFilled(areAllSlotsFilled());
  }, [slots]);

  const areAllSlotsFilled = (): boolean => {
    return slots.findIndex((slot) => slot === undefined) == -1;
  };

  const setUndefined = () => {
    setActiveColor(undefined);
    setActiveSlot(undefined);
  };

  const setActiveSlotAndAssignColors = (index: number) => {
    activeSlot == index ? setActiveSlot(undefined) : setActiveSlot(index);
    if (slots[index] !== undefined) {
      setSlots(Object.assign([], slots, { [index]: undefined }));
      setUndefined();
    } else if (activeColor) {
      setSlots(Object.assign([], slots, { [index]: activeColor }));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: Colors) => {
    activeColor == color ? setActiveColor(undefined) : setActiveColor(color);
    if (activeSlot) {
      setSlots(Object.assign([], slots, { [activeSlot]: color }));
      setUndefined();
    } else {
      const firstUndefinedIndex = slots.findIndex((slot) => slot === undefined);
      setSlots(Object.assign([], slots, { [firstUndefinedIndex]: color }));
    }
  };

  return (
    <>
      <Stack alignItems={"center"} gap={3}>
        <Koderad flexDirection="row">
          {slots.map((slot, index) => (
            <Box key={index} width={"40px"} height={"40px"}>
              <StyledButton
                onClick={() => setActiveSlotAndAssignColors(index)}
                variant="text"
              >
                {slot ? <Peg color={slot} /> : <EmptySlot className="test" />}
              </StyledButton>
            </Box>
          ))}
        </Koderad>
        <Stack flexDirection="row">
          {colors.map((color, index) => (
            <Box key={index} width={"40px"} height={"40px"}>
              <StyledButton
                onClick={() => setActiveColorAndAssignSlots(color)}
                variant="text"
              >
                <Peg color={color} />
              </StyledButton>
            </Box>
          ))}
        </Stack>
        {allSlotsAreFilled && (
          <Box mt={5}>
            <Button>
              OK lets gooo!{" "}
              <ArrowForwardIosIcon sx={{ fontSize: "0.8em", marginLeft: 1 }} />
            </Button>
          </Box>
        )}
      </Stack>
      <Box mt={3} mb={3}>
        {/* <Typography>Active slot: {activeSlot}</Typography>
        <Typography>Active color: {activeColor}</Typography> */}
      </Box>
    </>
  );
};

export default Spillrad;

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

const StyledButton = styled(Button)({
  width: "100%",
  height: "100%",
  padding: 0,
  minWidth: "unset",
});

const Koderad = styled(Stack)(({ theme }) => ({
  borderRadius: "30px",
  padding: "7px",
  boxShadow: "inset 2px 3px 4px 0 lightgrey,inset -2px -3px 4px 0 white",
}));
