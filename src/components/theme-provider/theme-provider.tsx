"use client";

import { ThemeProvider as ThemeProv, createTheme } from "@mui/material/styles";
// import { withStyles } from "@mui/styles";

const primary = "#4DC4FF";
const success = "#10C16F";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans JP",
  },
  palette: {
    primary: {
      main: primary,
    },
    success: {
      main: success,
      contrastText: "#FFFFFF",
    },
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
  },
});

// const cssVariables = () => ({
//   "@global": {
//     ":root": {
//       "--color-primary": primary,
//       "--color-success": success,
//     },
//   },
// });
// export const ThemeProvider = withStyles(cssVariables)((props: any) => {
//   const children = props.children;
//   return <ThemeProv theme={theme}>{children}</ThemeProv>;
// });

export default function ThemeProvider(props: { children: any }) {
  const children = props.children;
  return <ThemeProv theme={theme}>{children}</ThemeProv>;
}
