import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Box mt={3} ml={3}>
      <Button onClick={() => navigate(-1)}>
        <ArrowBackIosIcon sx={{ fontSize: "0.8em" }} />
        Tilbake
      </Button>
    </Box>
  );
};

export default BackButton;
