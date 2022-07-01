import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Box, Card} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(({ children, ...rest }) => (
    <Card {...rest}>{children}</Card>
  ))(({ theme }) => ({
    width: 800,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    ".content": {
      textAlign: "center",
      padding: "3rem 3.75rem 0px",
      [theme.breakpoints.down("xs")]: {
        padding: "1.5rem 1rem 0px",
      },
    },
  }));

const Progress = ({loading}) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position:'relative' }}>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'relative',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Progress;
