import { useContext, useEffect, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { Box, Button, Stack, Typography } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow, { PegPinsRow } from "../Components/PegRow";
import { CodeContext } from "../Components/AppWrapper";
import PegColors from "../Components/PegColors";
import { styled } from "@mui/system";
import { Colors } from "../Components/SetCode";

const Game = () => {
  const { code } = useContext(CodeContext);
  const [isCodeGuesser, setIsCodeGuesser] = useState(true);
  const [allSlots, setAllSlots] = useState(
    Array(10).fill(Array(4).fill(undefined))
  );
  const [activeRow, setActiveRow] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);

  useEffect(() => {
    setAllSlotsAreFilled(areAllSlotsFilled());
    if (allSlotsAreFilled) setActiveRow(activeRow + 1);
  }, [allSlots]);

  const areAllSlotsFilled = (): boolean => {
    return (
      allSlots[activeRow].findIndex((slot: any) => slot === undefined) == -1
    );
  };

  const setUndefined = () => {
    setActiveColor(undefined);
    setActiveSlot(undefined);
  };

  const setValueAtIndex = (
    array: any[],
    rowIndex: number,
    colIndex: number,
    newValue: any
  ): any[] => {
    setActiveRow(rowIndex);
    return array.map((row, r) =>
      r === rowIndex
        ? row.map((col: any, c: number) => (c === colIndex ? newValue : col))
        : row
    );
  };

  const findFirstUndefined = (
    array: (any | undefined)[][]
  ): [number, number] | null => {
    return (
      array
        .flatMap((row, rowIndex) =>
          row.map((cell, colIndex) =>
            cell === undefined ? [rowIndex, colIndex] : null
          )
        )
        .find((pos): pos is [number, number] => pos !== null) || null
    );
  };

  const setActiveSlotAndAssignColors = (index: number, rowNumber: number) => {
    setActiveRow(rowNumber);
    setActiveSlot(activeSlot == index ? undefined : index);
    if (allSlots[rowNumber][index] !== undefined) {
      setAllSlots(setValueAtIndex(allSlots, rowNumber, index, undefined));
      setUndefined();
    } else if (activeColor) {
      setAllSlots(setValueAtIndex(allSlots, rowNumber, index, activeColor));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: Colors) => {
    setActiveColor(activeColor == color ? undefined : color);
    if (activeSlot) {
      setAllSlots(setValueAtIndex(allSlots, activeRow, activeSlot, color));
      setUndefined();
    } else {
      const firstUndefinedIndex = findFirstUndefined(allSlots);
      firstUndefinedIndex &&
        setAllSlots(
          setValueAtIndex(
            allSlots,
            firstUndefinedIndex[0],
            firstUndefinedIndex[1],
            color
          )
        );
      setUndefined();
    }
  };

  return (
    <>
      <BackButton text={false} />
      <PageWrapper mt={-1} pt={0}>
        <Stack alignItems={"center"}>
          {allSlots
            .slice()
            .reverse()
            .map((row, i) => {
              const index = allSlots.length - i - 1;
              return (
                <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                  <Stack width={"20px"} alignItems={"center"}>
                    <Typography
                      variant="h2"
                      color={index == activeRow ? "red" : "grey"}
                    >
                      {index}
                    </Typography>
                  </Stack>
                  <PegRow
                    activeIndex={activeRow == index ? activeSlot : undefined}
                    key={index}
                    slots={row}
                    rowNumber={index}
                    {...(isCodeGuesser && {
                      setActiveSlotAndAssignColors:
                        setActiveSlotAndAssignColors,
                    })}
                  />
                  <PegPinsRow
                    slots={["black", "white", "white", undefined]}
                    {...(!isCodeGuesser && {
                      setActiveSlotAndAssignColors: () =>
                        console.log("codeguesser"),
                    })}
                  />
                </Stack>
              );
            })}
          {isCodeGuesser && (
            <CodeOrColorRow>
              <PegColors
                setActiveColorAndAssignSlots={setActiveColorAndAssignSlots}
              />
            </CodeOrColorRow>
          )}
          {!isCodeGuesser && (
            <CodeOrColorRow className="scroll-animation">
              <PegRow slots={code} shadow rowNumber={0} />
            </CodeOrColorRow>
          )}
        </Stack>
        <Box mt={0} className="scroll-animation">
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
  height: "60px",
});
