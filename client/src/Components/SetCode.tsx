import { useContext, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Box, Button, Collapse, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  areAllCodeSlotsFilled,
  CodeContext,
  Colors,
  routes,
} from "../variables";
import PegRow from "./PegRow";
import PegColors from "./PegColors";

export const SetCode = () => {
  const { code, setCode, useSameDevice } = useContext(CodeContext);
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
    if (activeSlot == index) setActiveSlot(undefined);
    else setActiveSlot(index);

    if (code[index] !== undefined) {
      setCode(Object.assign([], code, { [index]: undefined }));
      setUndefined();
    } else if (activeColor) {
      setCode(Object.assign([], code, { [index]: activeColor }));
      setUndefined();
    }
  };

  const setActiveColorAndAssignSlots = (color: Colors) => {
    if (activeColor == color) setActiveColor(undefined);
    else setActiveColor(color);
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
    setCode(code, useSameDevice ? false : true);
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
        <Collapse in={allSlotsAreFilled}>
          <Box mt={3} className="scroll-animation">
            <Button onClick={() => OkLetsGo()}>
              OK, lets go{" "}
              <ArrowForwardIosIcon sx={{ fontSize: "0.8em", marginLeft: 1 }} />
            </Button>
          </Box>
        </Collapse>
      </Stack>
    </>
  );
};

export default SetCode;
