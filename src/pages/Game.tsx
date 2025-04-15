import { useContext, useEffect, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, IconButton, Stack } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow, { PegPinsRow } from "../Components/PegRow";
import { CodeContext } from "../Components/AppWrapper";
import PegColors from "../Components/PegColors";
import { styled } from "@mui/system";
import { Colors } from "../Components/SetCode";

const Game = () => {
  const { code, game, setGame, isCodeGuesser, setIsCodeGuesser } =
    useContext(CodeContext);
  const [showCode, setShowCode] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);

  useEffect(() => {
    setAllSlotsAreFilled(areAllSlotsFilled());
    if (allSlotsAreFilled) setActiveRow(activeRow + 1);
  }, [game]);

  const areAllSlotsFilled = (): boolean => {
    return game[activeRow].findIndex((slot: any) => slot === undefined) == -1;
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
    if (game && game[rowNumber][index] !== undefined) {
      setGame(setValueAtIndex(game, rowNumber, index, undefined));
      setUndefined();
    } else if (activeColor) {
      setGame(setValueAtIndex(game, rowNumber, index, activeColor));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: Colors) => {
    setActiveColor(activeColor == color ? undefined : color);
    if (activeSlot) {
      setGame(setValueAtIndex(game, activeRow, activeSlot, color));
      setUndefined();
    } else {
      const firstUndefinedIndex = findFirstUndefined(game);
      firstUndefinedIndex &&
        setGame(
          setValueAtIndex(
            game,
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
          {game
            .slice()
            .reverse()
            .map((row, i) => {
              const index = game.length - i - 1;
              return (
                <Stack
                  key={index}
                  flexDirection={"row"}
                  gap={2}
                  alignItems={"center"}
                >
                  {/* <Stack width={"20px"} alignItems={"center"}>
                    <Typography
                      variant="h2"
                      color={index == activeRow ? "red" : "grey"}
                    >
                      {index}
                    </Typography>
                  </Stack> */}
                  <PegRow
                    activeIndex={activeRow == index ? activeSlot : undefined}
                    slots={row}
                    rowNumber={index}
                    {...(isCodeGuesser && {
                      setActiveSlotAndAssignColors:
                        setActiveSlotAndAssignColors,
                    })}
                  />
                  <PegPinsRow
                    slots={[undefined, undefined, undefined, undefined]}
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
            <>
              <CodeOrColorRow className="scroll-animation" gap={2}>
                <PegRow
                  slots={code}
                  shadow
                  rowNumber={0}
                  notVisible={!showCode}
                />
                <Box>
                  <IconButton onClick={() => setShowCode(!showCode)}>
                    {showCode ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </Box>
              </CodeOrColorRow>
            </>
          )}
        </Stack>
        <Box mt={2} className="scroll-animation">
          <Button
            onClick={() => {
              isCodeGuesser
                ? setIsCodeGuesser(!isCodeGuesser)
                : setIsCodeGuesser(!isCodeGuesser);
              setShowCode(false);
            }}
          >
            {isCodeGuesser ? "Jeg er ferdig å gjette" : "jeg er ferdig å rette"}
          </Button>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Game;

const CodeOrColorRow = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  marginTop: "40px",
  height: "60px",
});
