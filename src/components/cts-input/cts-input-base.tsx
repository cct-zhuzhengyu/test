"use client";

import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const CtsInputBase = styled(TextField)((options) => {
  const theme: any = options.theme;
  const primay = theme.palette.primary.main;
  return {
    "&": {
      width: "100%",
    },
    "& label": {
      height: "14px",
      fontSize: "12px",
      // lineHeight: "12px",
      color: "#000000 !important",
      transform: "unset",
      position: "unset",
    },
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInputBase-root": {
      marginTop: "4px",
      height: "28px",
      width: "100%",
      "& fieldset": {
        top: 0,
        borderColor: "#808080",
        " legend": {
          display: "none !important",
        },
      },
      "&:hover fieldset": {
        borderWidth: "1px",
        boxShadow: `0px 0px 6px ${primay}`,
        borderColor: primay,
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        boxShadow: `0px 0px 6px ${primay}`,
        borderColor: primay,
      },
    },
    "& .MuiInputBase-input": {
      position: "relative",
      fontSize: 14,
      padding: "4px 8px",
      height: "20px",
      fontWeight: "normal",
    },
    "& .Mui-disabled.MuiInputBase-root ": {
      pointerEvents: "none",
      backgroundColor: "#F1F1F1",
      ".MuiInputBase-input": {
        color: "#000000",
        WebkitTextFillColor: "#000000",
      },
    },
    "& .Mui-error": {
      "& fieldset": {
        borderColor: "#ff0000 !important",
      },
      "&:hover fieldset": {
        borderWidth: "1px",
        boxShadow: `0px 0px 6px #ff0000 !important`,
      },
    },
    // autocomplete
    "& .MuiAutocomplete-inputRoot": {
      padding: "0 65px 0 0 !important",
    },
    "& .MuiAutocomplete-input": {
      padding: "0 0 0 8px !important",
    },
  };
});

export default CtsInputBase;
