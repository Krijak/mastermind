import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)<TextFieldProps>({
  // "& :focus": {
  //   outline: "1px dashed black",
  //   outlineOffset: "6px",
  //   borderRadius: "2px",
  // },

  borderRadius: "4px",
  "& fieldset": {
    border: "none",
  },
  boxShadow: "inset 2px 3px 4px 0 lightgrey,inset -2px -3px 4px 0 white",
});
