import { Stack, StackProps } from "@mui/material";

export const PageWrapper = (props: StackProps) => {
  return (
    <Stack
      alignItems={"center"}
      mt={{ xs: 10, sm: 10, lg: 20 }}
      pt={6}
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export default PageWrapper;
