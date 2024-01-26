import { SvgIcon, SvgIconOwnProps } from "@mui/material";
import { ElementType, JSX } from "react";
import { CommonProps } from "@mui/material/OverridableComponent";

export default function CtsSvgIcon(
  props: JSX.IntrinsicAttributes & {
    component: ElementType<any, keyof JSX.IntrinsicElements>;
  } & SvgIconOwnProps &
    CommonProps &
    Omit<
      any,
      | "children"
      | "className"
      | "style"
      | "classes"
      | "color"
      | "fontSize"
      | "htmlColor"
      | "inheritViewBox"
      | "shapeRendering"
      | "sx"
      | "titleAccess"
      | "viewBox"
    >
) {
  return <SvgIcon sx={{ fontSize: 28 }} {...props} />;
}
