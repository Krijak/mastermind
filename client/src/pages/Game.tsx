import { useContext, useEffect, useLayoutEffect, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { Button, Stack, Typography } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow, { PegPinsRow } from "../Components/PegRow";
import PegColors from "../Components/PegColors";
import { Box, styled } from "@mui/system";
import PinPopup from "../Components/PinPopup";
import { useNavigate, useParams } from "react-router";
import { CodeContext, CodeType, Colors, GameType, routes } from "../variables";
import Confetti from "../Components/Confetti";

const Game = () => {
  const { game, setGame, pins, resetGame, code } = useContext(CodeContext);
  const [allCorrect, setAllCorrect] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);
  const [openPinPopup, setOpenPinPopup] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const room = params.roomid;

  // useEffect(() => {
  //   setIsError(isError.map((_, index) => calculateError(index)));
  // }, []);

  useEffect(() => {
    setAllSlotsAreFilled(areAllSlotsFilled());
    if (allSlotsAreFilled) setActiveRow(activeRow + 1);
  }, [game]);

  const areAllSlotsFilled = (): boolean => {
    return (
      game[activeRow].findIndex(
        (slot: Colors | undefined) => slot == undefined
      ) == -1
    );
  };

  const setUndefined = () => {
    setActiveColor(undefined);
    setActiveSlot(undefined);
  };

  const isAllCorrect = (bol: boolean) => {
    console.log("allcorrect", bol);
    setAllCorrect(bol);
  };

  useEffect(() => {
    console.log(pins);
    pins.forEach((row) => {
      if (row.every((color) => color === "black")) {
        setAllCorrect(true);
        return;
      }
    });
  }, [pins]);

  const setValueAtIndex = (
    array: GameType,
    rowIndex: number,
    colIndex: number,
    newValue: Colors | undefined
  ): GameType => {
    setActiveRow(rowIndex);
    return array.map((row, r) =>
      r === rowIndex
        ? row.map((col, c) => (c === colIndex ? newValue : col))
        : row
    ) as GameType;
  };

  const findFirstUndefined = (array: GameType): [number, number] | null => {
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
      if (firstUndefinedIndex != null) {
        setGame(
          setValueAtIndex(
            game,
            firstUndefinedIndex[0],
            firstUndefinedIndex[1],
            color
          )
        );
      }
      setUndefined();
    }
  };

  const handleBackClick = () => {
    if (allCorrect) {
      resetGame();
    } else return undefined;
  };

  return (
    <>
      <BackButton text={false} onClick={handleBackClick} />
      <PageWrapper
        mt={"-59px"}
        pt={0}
        justifyContent={"center"}
        height={"100%"}
      >
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
                    {...(!allCorrect && {
                      setActiveSlotAndAssignColors:
                        setActiveSlotAndAssignColors,
                    })}
                  />
                  <Button
                    {...(!allCorrect && {
                      onClick: () => {
                        setActiveRow(index);
                        setOpenPinPopup(true);
                      },
                    })}
                    {...(allCorrect && { component: "div", disabled: true })}
                  >
                    <Box>
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
            key={`dialog_${activeRow}`}
            setAllCorrect={isAllCorrect}
            open={openPinPopup}
            onClose={() => {
              setOpenPinPopup(false);
            }}
            activeRow={activeRow}
          />
          {allCorrect && (
            <>
              <Confetti />
              <Stack mt={4} alignItems={"center"}>
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
