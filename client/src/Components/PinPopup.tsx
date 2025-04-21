import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import PegRow, { PegPinsRow } from "./PegRow";
import { useContext, useEffect, useState } from "react";
import { PinColorsRow } from "./PegColors";

import { styled } from "@mui/system";
import {
  CodeContext,
  CodeType,
  PinColors,
  PinsType,
  PinType,
} from "../variables";

export const PinPopup = ({
  open,
  onClose,
  activeRow,
  setAllCorrect,
}: {
  open: boolean;
  onClose: () => void;
  activeRow: number;
  setAllCorrect: (allCorrect: boolean) => void;
}) => {
  const { code, game, pins, setPins } = useContext(CodeContext);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<PinColors | undefined>(
    undefined
  );
  const [popupPins, setPopupPins] = useState(pins[activeRow]);
  const [isError, setIsError] = useState(false);

  const setUndefined = () => {
    setActiveColor(undefined);
    setActiveSlot(undefined);
  };

  const setValueAtIndex = (
    array: PinsType,
    rowIndex: number,
    newValue: PinType
  ): PinsType => {
    return array.map((row, r) => (r === rowIndex ? newValue : row)) as PinsType;
  };

  const setActiveSlotAndAssignColors = (index: number) => {
    if (activeSlot == index) setActiveSlot(undefined);
    else setActiveSlot(index);

    if (popupPins[index] !== undefined) {
      setPopupPins(Object.assign([], popupPins, { [index]: undefined }));
      setUndefined();
    } else if (activeColor) {
      setPopupPins(Object.assign([], popupPins, { [index]: activeColor }));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: PinColors) => {
    if (activeColor == color) setActiveColor(undefined);
    else setActiveColor(color);
    if (activeSlot) {
      setPopupPins(Object.assign([], popupPins, { [activeSlot]: color }));
      setUndefined();
    } else {
      const firstUndefinedIndex = popupPins.findIndex(
        (slot) => slot == undefined
      );
      setPopupPins(
        Object.assign([], popupPins, { [firstUndefinedIndex]: color })
      );
      setUndefined();
    }
  };

  const countSharedValues = (a: CodeType, b: CodeType): number => {
    const countOccurrences = (arr: CodeType) =>
      arr.reduce<Map<any, number>>((acc, item) => {
        acc.set(item, (acc.get(item) ?? 0) + 1);
        return acc;
      }, new Map());

    const aCounts = countOccurrences(a);
    const bCounts = countOccurrences(b);

    return Array.from(aCounts.entries()).reduce((sum, [item, countA]) => {
      const countB = bCounts.get(item) ?? 0;
      return sum + Math.min(countA, countB);
    }, 0);
  };

  const calculateError = (rowIndex: number) => {
    const pinRow = popupPins;
    const row = game[rowIndex];
    const numCorrectColors = countSharedValues(row, code);
    const numCorrectPlaced = row.filter((color, i) => color === code[i]).length;
    const correctNumBlack = numCorrectPlaced;
    const correctNumWhite = numCorrectColors - numCorrectPlaced;
    const numWhitesInPinRow = pinRow.filter(
      (color) => color === "white"
    ).length;
    const numBlacksInPinRow = pinRow.filter(
      (color) => color === "black"
    ).length;
    const isWrong =
      correctNumBlack === numBlacksInPinRow &&
      correctNumWhite === numWhitesInPinRow
        ? false
        : true;
    return isWrong;
  };

  useEffect(() => {
    console.log("calculated errer");
    setIsError(calculateError(activeRow));
  }, []);

  useEffect(() => {
    setIsError(false);
  }, [popupPins]);

  const handleClose = () => {
    const error = calculateError(activeRow);
    if (error) {
      setIsError(error);
    } else {
      setPins(setValueAtIndex(pins, activeRow, popupPins));
      onClose();
      if (popupPins.every((color) => color === "black")) setAllCorrect(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ transition: "height 0.25s ease-in" }}
    >
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
              <Box
                sx={{
                  borderRadius: "6px",
                  outline: isError ? "1px solid red" : "",
                  outlineOffset: "4px",
                }}
              >
                <PegPinsRow
                  big
                  slots={popupPins}
                  setActiveSlotAndAssignColors={setActiveSlotAndAssignColors}
                />
              </Box>
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
            <Stack width={"100%"}>
              <Collapse in={isError} sx={{ alignSelf: "center" }}>
                <Typography alignSelf={"center"} color="red" mb={1}>
                  Whops, her var det noe feil
                </Typography>
              </Collapse>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Button onClick={() => onClose()}>Avbryt</Button>
                <Button onClick={() => handleClose()}>OK</Button>
              </Stack>
            </Stack>
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
