"use client";

import { Backdrop, Box, CircularProgress, Fade } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoading } from "@/lib/redux";

export default function Loading() {
  const loading = useSelector(selectLoading);
  return (
    <>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
