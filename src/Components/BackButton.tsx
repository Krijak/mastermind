import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, To } from "react-router-dom";

export const BackButton = (to: { to: To }) => {
  return (
    <Button component={Link} to={to.to}>
      <ArrowBackIosIcon sx={{ fontSize: "0.8em" }} />
      Tilbake
    </Button>
  );
};

export default BackButton;
