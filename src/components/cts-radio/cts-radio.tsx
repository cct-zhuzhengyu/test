import styled from "@emotion/styled";
import { Radio } from "@mui/material";

const CtsRadio = styled(Radio)((options) => {
  const theme: any = options.theme;
  return {
    "&": {
      padding: 0,
      color: theme.palette.primary.main,
      marginRight: "4px",
    },
    "&.Mui-disabled": {
      backgroundColor: "#F1F1F1 !important",
      color: `${theme.palette.primary.main} !important`,
      opacity: "0.5",
    },
  };
});

export default CtsRadio;
