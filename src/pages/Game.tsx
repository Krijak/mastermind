import { useContext, useEffect, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { Button, Stack, Typography } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow, { PegPinsRow } from "../Components/PegRow";
import { CodeContext } from "../Components/AppWrapper";
import PegColors from "../Components/PegColors";
import { styled } from "@mui/system";
import { Colors } from "../Components/SetCode";
import PinPopup from "../Components/PinPopup";
import { useNavigate } from "react-router";
import { routes } from "../variables";

const Game = () => {
  const { game, setGame, pins, resetGame } = useContext(CodeContext);
  const [allCorrect, setAllCorrect] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);
  const [openPinPopup, setOpenPinPopup] = useState(false);
  const navigate = useNavigate();

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
                  <PegRow
                    activeIndex={activeRow == index ? activeSlot : undefined}
                    slots={row}
                    rowNumber={index}
                    setActiveSlotAndAssignColors={setActiveSlotAndAssignColors}
                  />
                  {!allCorrect ? (
                    <Button
                      sx={{ margin: 0, padding: 0, minWidth: "unset" }}
                      onClick={() => {
                        setActiveRow(index);
                        setOpenPinPopup(true);
                      }}
                    >
                      <PegPinsRow slots={pins[index]} />
                    </Button>
                  ) : (
                    <PegPinsRow slots={pins[index]} />
                  )}
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
            setAllCorrect={setAllCorrect}
            open={openPinPopup}
            onClose={() => setOpenPinPopup(false)}
            activeRow={activeRow}
          />
          {allCorrect && (
            <Stack mt={5} alignItems={"center"}>
              <Typography>Gratulerer!</Typography>
              <Typography mb={2}>👏👏👏</Typography>
              <Button
                onClick={() => {
                  resetGame();
                  navigate(routes.gameSetup);
                }}
              >
                Spill igjen
              </Button>
            </Stack>
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
  marginTop: "40px",
  height: "60px",
});
