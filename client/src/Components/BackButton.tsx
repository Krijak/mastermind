import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { routes } from "../variables";

export const BackButton = ({
  text = false,
  back = false,
  onClick,
}: {
  text?: boolean;
  back?: boolean;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (back) {
      navigate(-1);
    } else {
      navigate(routes.forside);
    }
    if (onClick) onClick();
  };

  return (
    <Box mt={3} ml={3}>
      <Button onClick={() => handleOnClick()}>
        <Typography>
          <ArrowBackIosIcon sx={{ fontSize: "0.8em" }} />
        </Typography>
        {text && "Tilbake"}
      </Button>
    </Box>
  );
};

export default BackButton;
