import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { routes } from "../variables";

export const BackButton = ({ text = true }: { text?: boolean }) => {
  const navigate = useNavigate();
  return (
    <Box mt={3} ml={3}>
      <Button onClick={() => navigate(routes.forside)}>
        <Typography>
          <ArrowBackIosIcon sx={{ fontSize: "0.8em" }} />
        </Typography>
        {text && "Tilbake"}
      </Button>
    </Box>
  );
};

export default BackButton;
