import styled from "@emotion/styled";
import { Button } from "@mui/material";

const CtsButton = styled(Button)((options) => {
  const theme: any = options.theme;
  return {
    "&.MuiButton-outlinedPrimary": {
      color: "#000000",
      borderColor: "#000000",
    },
  };
});

export default CtsButton;
