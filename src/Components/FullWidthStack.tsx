import { Stack, StackProps } from "@mui/material";

export const FullWidthStack = (props: StackProps) => {
  return (
    <Stack
      flexDirection={"row"}
      mt={5}
      flexWrap={"wrap"}
      justifyContent={"center"}
      width={"100%"}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        padding: 5,
      }}
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export default FullWidthStack;
