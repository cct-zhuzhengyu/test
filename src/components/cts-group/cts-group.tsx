"use client";

import style from "./cts-group.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  debounce,
} from "@mui/material";
import CtsButton from "../cts-button/cts-button";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { setSearchPanelHeight, useDispatch } from "@/lib/redux";
import { useImmer } from "use-immer";
import CtsSvgIcon from "../cts-svg-icon/cts-svg-icon";
import InnerHeader from "@/assets/icons/InnerHeaderTitle.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CtsGroup(props: any) {
  const [list, setList] = useImmer(props.value);
  const { children, onChange } = props;
  const componentRef = useRef(null);

  const [expanded, setExpanded] = useState(true);

  const handleChange = () => {
    // setExpanded(isExpanded);
  };

  useEffect(() => {}, []);

  return (
    <>
      {list.map((item: any, index: number) => (
        <Grid item xs={3} key={index}>
          <Grid container rowSpacing={0} columnSpacing={"4px"}>
            <>{children}</>
            {list.length !== 1 && (
              <CtsSvgIcon component={RemoveIcon}></CtsSvgIcon>
            )}
            {index === list.length - 1 && (
              <CtsSvgIcon component={AddIcon}></CtsSvgIcon>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
}
