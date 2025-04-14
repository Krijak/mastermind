import { Stack, StackProps, styled, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

type DayAndDateType = {
  day: string;
  date: string;
} & PropsWithChildren &
  StackProps;

export const DayAndDate = ({
  day,
  date,
  children,
  ...restProps
}: DayAndDateType) => {
  return (
    <Wrapper padding={6} pl={0} paddingBottom={3} {...restProps}>
      <Day variant="h3">{day}</Day>
      <Date variant="h2" fontSize={"1rem"}>
        {date}
      </Date>

      <Stack sx={{ marginTop: 1 }} alignSelf={"flex-start"}>
        <Typography variant="h1">{children}</Typography>
      </Stack>
    </Wrapper>
  );
};

export default DayAndDate;

const Day = styled(Typography)({
  fontSize: "0.8rem",
  textTransform: "uppercase",
});

const Date = styled(Typography)({
  fontSize: "1rem",
});

const Wrapper = styled(Stack)({
  width: "100%",
  maxWidth: "500px",
});
