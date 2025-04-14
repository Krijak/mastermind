import { Box, Stack, styled, Typography } from "@mui/material";
import FredagImg from "/Fredag.jpg";
import AnimatedImage from "../Components/AnimatedImage";
import DayAndDate from "../Components/DayAndDate";
import FullWidthStack from "../Components/FullWidthStack";
import PageWrapper from "../Components/PageWrapper";
import TimeLineItem from "../Components/TimeLineItem";

const Fredag = () => {
  return (
    <PageWrapper>
      <Stack>
        <Stack
          flexDirection={"row"}
          alignItems={"end"}
          flexWrap={"wrap-reverse"}
          justifyContent={"center"}
          mb={{ lg: 10 }}
        >
          <AnimatedImage
            mt={10}
            maxWidth={"700px"}
            alt="MS Bruvik"
            src={FredagImg}
            className="scroll-animation"
          />
          <Stack pl={6} pr={6}>
            <DayAndDate day="Fredag" date="29 / 08 / 25">
              LOREM IPSUM
            </DayAndDate>

            <Stack width={"100%"} maxWidth={"700px"}>
              <Typography maxWidth={"600px"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis massa vitae nunc accumsan, in congue justo feugiat.
                Donec a nisl sapien. Vivamus blandit pharetra quam a
                pellentesque. Sed vel turpis vulputate, porttitor mi ut, iaculis
                nunc. Aliquam arcu enim, commodo eget volutpat a, bibendum quis
                ipsum. Ut elementum feugiat justo, id feugiat nisl blandit ac.
                Proin pharetra maximus sem, vel tristique ligula tincidunt
                tristique. Quisque scelerisque sagittis nisl, id facilisis urna
                efficitur quis. Donec venenatis elementum dolor vel eleifend. Ut
                tristique nibh ac justo tempus, at luctus risus tempor.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          mt={5}
          ml={{ sm: 0, lg: "690px" }}
          padding={6}
          paddingTop={{ lg: 0 }}
          alignItems={{ sm: "center", lg: "flex-start" }}
        >
          <TimeLineItem>
            <Box maxWidth={"400px"}>
              <Typography
                variant="h2"
                mb={2}
                className={"apply-scroll-animation"}
              >
                17 : 00
              </Typography>
              <Typography className={"apply-scroll-animation"} mb={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis massa vitae nunc accumsan, in congue justo feugiat.
              </Typography>
              <Typography className={"apply-scroll-animation"} mb={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis massa vitae nunc accumsan, in congue justo feugiat.
              </Typography>
              <Typography className={"apply-scroll-animation"} mb={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis massa vitae nunc accumsan, in congue justo feugiat.
              </Typography>
            </Box>
          </TimeLineItem>
        </Stack>

        <Stack
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={{
            xs: "center",
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
          width={"100%"}
        ></Stack>
      </Stack>

      <FullWidthStack mt={{ xs: 0, sm: 0, lg: 10 }}>
        <Box maxWidth={"600px"} padding={5}>
          <Typography variant="h2" textTransform={"uppercase"} mb={2}>
            Lorem Ipsum
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis massa vitae nunc accumsan, in congue justo feugiat. Donec a
            nisl sapien. Vivamus blandit pharetra quam a pellentesque. Sed vel
            turpis vulputate, porttitor mi ut, iaculis nunc. Aliquam arcu enim,
            commodo eget volutpat a, bibendum quis ipsum.
          </Typography>
        </Box>
      </FullWidthStack>
    </PageWrapper>
  );
};

export default Fredag;

export const StyledLeftSideStack = styled(Stack)({
  minWidth: "100px",
  maxWidth: "100px",
  alignItems: "flex-end",
});

export const StyledBox = styled(Stack)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  marginLeft: theme.spacing(4),
  borderLeft: "1px solid",
  borderColor: theme.palette.primary.main,
}));
