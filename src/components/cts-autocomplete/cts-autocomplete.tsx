import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";

const CtsAutocomplete = styled(Autocomplete)((options) => {
  const theme: any = options.theme;
  return {
    "& .MuiAutocomplete-clearIndicator": {
      visibility: "unset",
    },
  };
});

export default CtsAutocomplete;
