import { Typography } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import BackButton from "../Components/BackButton";

const NoRoom = () => {
  return (
    <>
      <BackButton back />
      <PageWrapper>
        <Typography>Hm, det finnes ingen rom med dette navnet</Typography>
      </PageWrapper>
    </>
  );
};

export default NoRoom;
