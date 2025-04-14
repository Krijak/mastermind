import { Box, Link, Stack, Typography } from "@mui/material";
import Hage from "/hage.jpg";
import AnimatedImage from "../Components/AnimatedImage";
import DayAndDate from "../Components/DayAndDate";
import PageWrapper from "../Components/PageWrapper";
import TimeLineItem from "../Components/TimeLineItem";

const TimeLine = () => {
  return (
    <Box pt={3}>
      <TimeLineItem header={<Typography variant="h2">13 : 00</Typography>}>
        <Typography
          variant="h2"
          marginBottom={2}
          className={"apply-scroll-animation"}
        >
          Vielse i hagen
        </Typography>
      </TimeLineItem>
      <TimeLineItem header={<Typography variant="h2">14 : 00</Typography>}>
        <Box className={"apply-scroll-animation"}>
          <Typography variant="h2">Bryllupskake og bobler</Typography>
          <Typography marginBottom={2} maxWidth={"300px"}>
            Lett fingermat og underholdning mens brudeparet tar bilder
          </Typography>
        </Box>
      </TimeLineItem>
      <TimeLineItem header={<Typography variant="h2">17 : 00</Typography>}>
        <Box className={"apply-scroll-animation"}>
          <Typography variant="h2">Bordsetting</Typography>
          <Typography marginBottom={2} maxWidth={"300px"}>
            Videre blir det grillmat, god stemning, kake og kaffe og
            selvfølgelig fest!
          </Typography>
        </Box>
      </TimeLineItem>
      <TimeLineItem header={<Typography variant="h2">00 : 00</Typography>}>
        <Typography
          variant="h2"
          marginBottom={2}
          className={"apply-scroll-animation"}
        >
          Nattmat
        </Typography>
      </TimeLineItem>
      <TimeLineItem
        isLast
        header={<Typography variant="h2">02 : 00</Typography>}
      >
        <Typography
          variant="h2"
          marginBottom={2}
          className={"apply-scroll-animation"}
        >
          Festen avsluttes
        </Typography>
      </TimeLineItem>
    </Box>
  );
};

const Program = () => {
  return (
    <PageWrapper>
      <Stack>
        <DayAndDate
          day="Lørdag"
          date="16 / 08 / 25"
          pl={{ xs: 6, sm: 6, lg: 0 }}
        >
          BRYLLUPSDAGEN
        </DayAndDate>
        <Box
          ml={{ xs: 6, sm: 6, lg: 0 }}
          mr={{ xs: 6, sm: 6, lg: 0 }}
          maxWidth={"500px"}
        >
          <Typography>
            Velkommen til hagebryllup i{" "}
            <Link
              target="_blank"
              href="https://www.google.com/maps/place/Sarpemyrveien+51,+1560+Larkollen/@59.5437826,10.3970255,119874m/data=!3m1!1e3!4m6!3m5!1s0x4646ac30434edf45:0x601079678cbb378!8m2!3d59.3227404!4d10.7066174!16s%2Fg%2F11crt8jv9d?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D"
            >
              Sarpemyrveien 51
            </Link>{" "}
            i Larkollen ☀️
          </Typography>
        </Box>

        <Stack
          sx={{ maxWidth: "800px", width: "auto" }}
          mt={10}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={2}
        >
          <AnimatedImage alt="Hagen" src={Hage} />
        </Stack>
        <Box pt={4} display={{ xs: "none", sm: "none", lg: "flex" }}>
          <TimeLine />
        </Box>

        <Stack
          display={{ xs: "flex", sm: "flex", lg: "none" }}
          maxWidth={"800px"}
          width={"100%"}
          flexWrap={"wrap"}
          justifyContent={{ xs: "center", sm: "center", lg: "flex-start" }}
          alignContent={{ xs: "center", sm: "center", lg: "flex-start" }}
          flexDirection={{ xs: "column", sm: "column", lg: "row" }}
          mt={7}
          pb={0}
        >
          <TimeLine />
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default Program;
