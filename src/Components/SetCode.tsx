import { useContext, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../variables";
import PegRow, { PinColors } from "./PegRow";
import PegColors from "./PegColors";
import { CodeContext } from "./AppWrapper";

export type Tuple<
  T,
  N extends number,
  R extends T[] = []
> = R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;

export const numPegs = 4 as const;

// export type Colors =
//   | "#8f2c5d"
//   | "red"
//   | "pink"
//   | "orange"
//   | "#4f74a9"
//   | "lightblue";

// export const colors: Colors[] = [
//   "#8f2c5d",
//   "red",
//   "pink",
//   "orange",
//   "#4f74a9",
//   "lightblue",
// ];

export type Colors = "pink" | "red" | "green" | "purple" | "orange" | "black";

export const colors: Colors[] = [
  "pink",
  "red",
  "green",
  "purple",
  "orange",
  "black",
];

export const pinColors: PinColors[] = ["black", "white"];

export type PegColor = {
  color: Colors | undefined;
};

export type NumPegsType = Tuple<Colors | undefined, typeof numPegs>;

export const areAllCodeSlotsFilled = (code: NumPegsType): boolean => {
  return code.findIndex((slot) => slot === undefined || slot === null) == -1;
};

export const SetCode = () => {
  const { code, setCode } = useContext(CodeContext);
  const navigate = useNavigate();

  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);

  useEffect(() => {
    setAllSlotsAreFilled(areAllCodeSlotsFilled(code));
  }, [code]);

  const setUndefined = () => {
    setActiveColor(undefined);
    setActiveSlot(undefined);
  };

  const setActiveSlotAndAssignColors = (index: number) => {
    activeSlot == index ? setActiveSlot(undefined) : setActiveSlot(index);
    if (code[index] !== undefined) {
      setCode(Object.assign([], code, { [index]: undefined }));
      setUndefined();
    } else if (activeColor) {
      setCode(Object.assign([], code, { [index]: activeColor }));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: Colors) => {
    activeColor == color ? setActiveColor(undefined) : setActiveColor(color);
    if (activeSlot) {
      setCode(Object.assign([], code, { [activeSlot]: color }));
      setUndefined();
    } else {
      const firstUndefinedIndex = code.findIndex((slot) => slot == undefined);
      setCode(Object.assign([], code, { [firstUndefinedIndex]: color }));
      setUndefined();
    }
  };

  const OkLetsGo = () => {
    setCode(code);
    navigate(routes.game);
  };

  return (
    <>
      <Stack alignItems={"center"} gap={3} className="scroll-animation">
        <PegRow
          rowNumber={0}
          slots={code}
          setActiveSlotAndAssignColors={setActiveSlotAndAssignColors}
          shadow
        />
        <PegColors
          setActiveColorAndAssignSlots={setActiveColorAndAssignSlots}
        />
        {allSlotsAreFilled && (
          <Box mt={5} className="scroll-animation">
            <Button onClick={() => OkLetsGo()}>
              OK, lets go{" "}
              <ArrowForwardIosIcon sx={{ fontSize: "0.8em", marginLeft: 1 }} />
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default SetCode;
