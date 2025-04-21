import { useContext, useEffect, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, ClickAwayListener, Stack, Tooltip } from "@mui/material";
import BackButton from "../Components/BackButton";
import PegRow, { PegPinsRow } from "../Components/PegRow";
import PegColors from "../Components/PegColors";
import { Box, styled } from "@mui/system";
import PinPopup from "../Components/PinPopup";
import { useLocation, useNavigate, useParams } from "react-router";
import { CodeContext, Colors, GameType, routes } from "../variables";
import Confetti from "../Components/Confetti";

const Game = () => {
  const { game, setGame, pins, resetGame, roomId, useSameDevice, setRoomId } =
    useContext(CodeContext);
  const [allCorrect, setAllCorrect] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<Colors | undefined>(undefined);
  const [allSlotsAreFilled, setAllSlotsAreFilled] = useState(false);
  const [openPinPopup, setOpenPinPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const room = params.roomid;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.zoom = "100%";
  });

  useEffect(() => {
    setAllSlotsAreFilled(areAllSlotsFilled());
    if (allSlotsAreFilled) setActiveRow(activeRow + 1);
  }, [game]);

  useEffect(() => {
    console.log(roomId);
    if (room) {
      setRoomId(room);
      console.log("sat room", room);
    }
    if (roomId && !useSameDevice) {
      setRoomId(roomId);
      console.log("sat roomId");
    }
  }, []);

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
    setAllCorrect(bol);
  };

  useEffect(() => {
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
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mr={3}
      >
        <BackButton text={false} onClick={handleBackClick} />
        {roomId && !useSameDevice && (
          <>
            <ClickAwayListener onClickAway={() => setSnackbarOpen(false)}>
              <Tooltip
                title={`Kopierte ${roomId}`}
                placement="bottom"
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                }}
              >
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    setSnackbarOpen(true);
                    setTimeout(() => {
                      setSnackbarOpen(false);
                    }, 2000);
                  }}
                >
                  {roomId}{" "}
                  <ContentCopyIcon
                    sx={{ fontSize: "0.9rem", marginLeft: "6px" }}
                  />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          </>
        )}
      </Stack>
      <PageWrapper pt={0} mt={0} justifyContent={"center"} height={"100%"}>
        <Stack alignItems={"center"} mb={20}>
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
