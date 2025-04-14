import { Box, Link, Stack, Typography } from "@mui/material";
import Epler from "/epler.jpg";
import Pir from "/pir.jpg";
import Pirer from "/pirer.jpg";
import AnimatedImage from "../Components/AnimatedImage";
import FullWidthStack from "../Components/FullWidthStack";
import PageWrapper from "../Components/PageWrapper";
import { routes } from "../variables";

const TransportOgOvernatting = () => {
  return (
    <PageWrapper>
      <AnimatedImage
        style={{ minWidth: "100px" }}
        maxWidth={{ xs: "400px", sm: "400px", lg: "500px" }}
        paddingLeft={9}
        paddingRight={9}
        alt="Pir"
        src={Pir}
      />
      <Stack maxWidth={"600px"} mt={4} padding={6}>
        <Typography variant="h1">OVERNATTING</Typography>
        <Typography mt={3}>
          Bryllupet vil finne sted i{" "}
          <Link
            target="_blank"
            href="https://www.google.com/maps/place/Sarpemyrveien+51,+1560+Larkollen/@59.5437826,10.3970255,119874m/data=!3m1!1e3!4m6!3m5!1s0x4646ac30434edf45:0x601079678cbb378!8m2!3d59.3227404!4d10.7066174!16s%2Fg%2F11crt8jv9d?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D"
          >
            Sarpemyrveien 51
          </Link>{" "}
          i Larkollen hos Turid og Svein. Det finnes hus og hytter i nærheten
          man kan leie på Airbnb.
        </Typography>
        <Typography mt={2}>
          Nærmeste hotell er vakre{" "}
          <Link
            target="_blank"
            href="https://www.stotvighotel.com/?gad_source=1&gbraid=0AAAAACP7TS6i_kDuILeuntSRl0uvN82wB&gclid=Cj0KCQjw16O_BhDNARIsAC3i2GBUtm4V8jkGZ7889syI08qUdPujxbvIYSrSXSRkSRoFrk9cTh4fS_MaAmCZEALw_wcB"
          >
            Støtvig hotell.
          </Link>
        </Typography>
        <Typography mt={2}>
          Det finnes også hotell i Moss, ca 15-20 min kjøring fra bryllypet.
          Eksempelvis{" "}
          <Link
            target="_blank"
            href="https://hotelriviera.no/?utm_campaign=bb-search-brand-exact-no&gad_source=1&gbraid=0AAAAAog91Ne69P3vs6-ndIy_vOw78E08j&gclid=Cj0KCQjw16O_BhDNARIsAC3i2GDjvCZ7Y44SYAs_X4-Ab2SpM5MQo2S87GzazL9-bPayU98RADnNcjUaAgKnEALw_wcB"
          >
            hotell Riviera.
          </Link>
        </Typography>
      </Stack>
      <Stack
        style={{ maxWidth: "800px", minWidth: "200px" }}
        mt={10}
        flexDirection={"row"}
        justifyContent={"center"}
        gap={2}
      >
        <AnimatedImage width={"50%"} alt="Epler i kurv" src={Epler} />
        <AnimatedImage width={"30%"} alt="Pirer" src={Pirer} />
      </Stack>
      <Stack alignItems={"center"}>
        <Box maxWidth={"500px"} mt={5} padding={6}>
          <Typography variant="h1">TRANSPORT</Typography>
          <Typography mt={3}>
            Det er forskjellige kollektivtilbud avhengig av hvor dere reiser
            fra. Når dere svarer på <Link href={routes.rsvp}>RSVP</Link>, la oss
            vite om dere har transportbehov, eller ønsker parkering slik at vi
            kan møte deres behov.
          </Typography>
        </Box>
      </Stack>
      <FullWidthStack>
        <Stack
          gap={4}
          maxWidth={"900px"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          flexDirection={"row"}
        >
          <Box maxWidth={"300px"}>
            <Typography mb={1} className={"apply-scroll-animation"}>
              <b>Fra Oslo</b>
            </Typography>
            <Typography className={"apply-scroll-animation"}>
              Fra Oslo går det tog til Rygge togstasjon som tar 45 min. Det tar
              1 time å kjøre fra Oslo til Larkollen.
            </Typography>
          </Box>
          <Box maxWidth={"300px"}>
            <Typography mb={1} className={"apply-scroll-animation"}>
              <b>Fra Gardermoen</b>
            </Typography>
            <Typography className={"apply-scroll-animation"}>
              Fra Gardermoen går det enten flybuss eller tog. Flybuss FB11
              Fredrikstad til Rygge E6 tar 1 time og 40 min. Alternativt kan man
              ta tog til Oslo S og videre tog til Moss/Rygge.
            </Typography>
          </Box>
          <Box maxWidth={"300px"}>
            <Typography mb={1} className={"apply-scroll-animation"}>
              <b>Fra Rygge</b>
            </Typography>
            <Typography className={"apply-scroll-animation"}>
              Fra Rygge togstasjon til bryllupet tar det 12 min å kjøre. Det er
              dårlig med kollektivt, så dersom du kommer med toget fikser vi
              biltransport.
            </Typography>
          </Box>
          <Box maxWidth={"300px"}>
            <Typography mb={1} className={"apply-scroll-animation"}>
              <b>Fra Moss</b>
            </Typography>
            <Typography className={"apply-scroll-animation"}>
              Det tar ca. 20 min å kjøre fra Moss til Larkollen med bil. Siste
              tog til Oslo går i 23-tiden.
            </Typography>
          </Box>
        </Stack>
      </FullWidthStack>
    </PageWrapper>
  );
};

export default TransportOgOvernatting;
