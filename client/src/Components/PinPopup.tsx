import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import PegRow, { PegPinsRow } from "./PegRow";
import { useContext, useState } from "react";
import { PinColorsRow } from "./PegColors";

import { styled } from "@mui/system";
import { CodeContext, PinColors, PinsType } from "../variables";

export const PinPopup = ({
  open,
  onClose,
  activeRow,
  setAllCorrect,
}: {
  open: boolean;
  onClose: () => void;
  activeRow: number;
  setAllCorrect: (allCorrect: boolean, activeRow: number) => void;
}) => {
  const { code, game, pins, setPins } = useContext(CodeContext);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<PinColors | undefined>(
    undefined
  );

  // useEffect(() => {}, [activeColor, activeSlot]);

  const setUndefined = () => {
    setActiveColor(undefined);
    setActiveSlot(undefined);
  };

  const setValueAtIndex = (
    array: PinsType,
    rowIndex: number,
    colIndex: number,
    newValue: PinColors | undefined
  ): PinsType => {
    return array.map((row, r) =>
      r === rowIndex
        ? row.map((col, c) => (c === colIndex ? newValue : col))
        : row
    ) as PinsType;
  };

  const setActiveSlotAndAssignColors = (index: number) => {
    setActiveSlot(activeSlot == index ? undefined : index);
    if (pins && pins[activeRow][index] !== undefined) {
      setPins(setValueAtIndex(pins, activeRow, index, undefined));
      setUndefined();
    } else if (activeColor) {
      setPins(setValueAtIndex(pins, activeRow, index, activeColor));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: PinColors) => {
    setActiveColor(activeColor == color ? undefined : color);
    if (activeSlot !== undefined) {
      setPins(setValueAtIndex(pins, activeRow, activeSlot, color));
      setUndefined();
    } else {
      const firstUndefinedIndex = pins[activeRow].findIndex(
        (slot) => slot === undefined || slot === null
      );
      if (firstUndefinedIndex !== undefined)
        setPins(setValueAtIndex(pins, activeRow, firstUndefinedIndex, color));
      setUndefined();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack justifyContent={"center"} gap={2}>
          <Stack flexDirection={"row"} gap={2}>
            <PegRow slots={game[activeRow]} rowNumber={0} />
            <Wrapper>
              <PegPinsRow
                big
                slots={pins[activeRow]}
                setActiveSlotAndAssignColors={setActiveSlotAndAssignColors}
              />
            </Wrapper>
          </Stack>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <PegRow shadow slots={code} rowNumber={0} />
            <Wrapper>
              <PinColorsRow
                setActiveColorAndAssignSlots={setActiveColorAndAssignSlots}
              />
            </Wrapper>
          </Stack>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{ width: "200px" }}
              onClick={() => {
                onClose();
                if (pins[activeRow].every((color) => color === "black"))
                  setAllCorrect(true, activeRow);
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PinPopup;

const Wrapper = styled(Stack)({
  width: "100px",
  alignItems: "center",
});
