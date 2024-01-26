"use client";

import { SnackbarProvider as SnackbarContainer } from "notistack";
import Snackbar from "./snackbar";

export default function SnackbarProvider(props: { children: any }) {
  const children = props.children;

  return (
    <>
      <SnackbarContainer
        Components={{
          error: Snackbar,
          success: Snackbar,
          info: Snackbar,
        }}
        maxSnack={3}
      >
        {children}
      </SnackbarContainer>
    </>
  );
}
