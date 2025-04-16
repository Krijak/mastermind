import { Divider, DividerProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDivider = styled(Divider)<DividerProps>(() => {
  return {
    color: "grey",
    borderColor: "lightgrey",
    "&.MuiDivider-withChildren::before, &.MuiDivider-withChildren::after": {
      borderColor: "lightgrey",
    },
  };
});
