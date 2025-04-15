import { useContext, useEffect, useLayoutEffect, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { Button, Stack, Typography } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow, { PegPinsRow } from "../Components/PegRow";
import { CodeContext } from "../Components/AppWrapper";
import PegColors from "../Components/PegColors";
import { Box, styled } from "@mui/system";
import { Colors } from "../Components/SetCode";
import PinPopup from "../Components/PinPopup";
import { useNavigate } from "react-router";
import { routes } from "../variables";
import Confetti from "../Components/Confetti";

const Game = () => {
  const { game, setGame, pins, resetGame, code } = useContext(CodeContext);
  const [allCorrect, setAllCorrect] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);
  const [openPinPopup, setOpenPinPopup] = useState(false);
  const [isError, setIsError] = useState(Array(10).fill(false));
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setIsError(isError.map((_, index) => calculateError(index)));
  }, []);

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

  const isAllCorrect = (bol: boolean) => {
    setAllCorrect(bol && noWrongs());
  };

  const noWrongs = () => {
    return isError.filter((row) => row === true).length === 0;
  };

  const calculateError = (rowIndex: number) => {
    const pinRow = pins[rowIndex];
    const row = game[rowIndex];
    const sortedrow = row.slice().sort();
    const sortedCode = code.slice().sort();
    const numCorrectColors = sortedrow.filter(
      (color, i) => color === sortedCode[i]
    ).length;
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
    array: (any | undefined | null)[][]
  ): [number, number] | null => {
    return (
      array
        .flatMap((row, rowIndex) =>
          row.map((cell, colIndex) =>
            cell === undefined || cell === null ? [rowIndex, colIndex] : null
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
    if (activeSlot !== undefined) {
      setGame(setValueAtIndex(game, activeRow, activeSlot, color));
      setUndefined();
    } else {
      const firstUndefinedIndex = findFirstUndefined(game);
      firstUndefinedIndex != null &&
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
      <PageWrapper mt={-2} pt={0}>
        <Stack alignItems={"center"}>
          {game
            .slice()
            .reverse()
            .map((row, i) => {
              const index = game.length - i - 1;
              return (
                <Stack key={index} flexDirection={"row"} alignItems={"center"}>
                  <PegRow
                    activeIndex={activeRow == index ? activeSlot : undefined}
                    slots={row}
                    rowNumber={index}
                    setActiveSlotAndAssignColors={setActiveSlotAndAssignColors}
                  />
                  <Button
                    {...(!allCorrect && {
                      onClick: () => {
                        setActiveRow(index);
                        setOpenPinPopup(true);
                      },
                    })}
                    {...(allCorrect && { component: "div" })}
                  >
                    <Box
                      sx={{
                        borderRadius: "6px",
                        outline: isError[index] ? "1px solid red" : "",
                        outlineOffset: "4px",
                      }}
                    >
                      <PegPinsRow slots={pins[index]} />
                    </Box>
                  </Button>
                </Stack>
              );
            })}
          {!allCorrect && (
            <CodeOrColorRow>
              <PegColors
                setActiveColorAndAssignSlots={setActiveColorAndAssignSlots}
              />
            </CodeOrColorRow>
          )}
          <PinPopup
            setAllCorrect={isAllCorrect}
            open={openPinPopup}
            onClose={() => {
              setOpenPinPopup(false);
              setIsError(
                isError.map((val, index) =>
                  index === activeRow ? calculateError(activeRow) : val
                )
              );
            }}
            activeRow={activeRow}
          />
          {allCorrect && (
            <>
              <Confetti />
              <Stack mt={2} alignItems={"center"}>
                <Typography>omg</Typography>
                <Typography mb={3}>WOOOOHOOOO!!</Typography>
                <Button
                  onClick={() => {
                    resetGame();
                    navigate(routes.gameSetup);
                  }}
                >
                  Spill igjen
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </PageWrapper>
    </>
  );
};

export default Game;

const CodeOrColorRow = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  marginTop: "20px",
  height: "60px",
});
