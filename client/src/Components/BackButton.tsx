import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { routes } from "../variables";

export const BackButton = ({
  text = false,
  onClick,
}: {
  text?: boolean;
  back?: boolean;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(routes.forside, { replace: true });
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
