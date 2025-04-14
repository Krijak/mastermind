import { PropsWithChildren, ReactNode } from "react";
import { Box, Stack, StackProps, styled } from "@mui/material";

type TimelineItemType = {
  header?: ReactNode;
  isLast?: boolean;
} & PropsWithChildren;

export const TimeLineItem = ({
  header,
  isLast,
  children,
  ...restProps
}: TimelineItemType & StackProps) => {
  return (
    <Stack flexDirection={"row"} {...restProps}>
      {header && <Box whiteSpace={"nowrap"}>{header}</Box>}
      <Stack whiteSpace={"nowrap"} marginRight={2} marginLeft={2}>
        <Box mb="4px" mt="4px">
          <Dot />
        </Box>
        {!isLast && <Line />}
      </Stack>
      <Box>
        <Box>{children}</Box>
      </Box>
    </Stack>
  );
};

export default TimeLineItem;

const Dot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  marginLeft: "-3px",
  opacity: "40%",
}));

const Line = styled("span")({
  borderLeft: "1px solid",
  borderColor: "#56012e33",
  height: "calc(100% - 4px)",
  opacity: "40%",
});
