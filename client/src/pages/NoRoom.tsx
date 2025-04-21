import { Typography } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import BackButton from "../Components/BackButton";

const NoRoom = () => {
  return (
    <>
      <BackButton back />
      <PageWrapper>
        <Typography>Hm,</Typography>
        <Typography>kunne ikke finne et spill med dette navnet</Typography>
        <Typography fontSize={"1.5rem"} mt={2}>
          🤷
        </Typography>
      </PageWrapper>
    </>
  );
};

export default NoRoom;
