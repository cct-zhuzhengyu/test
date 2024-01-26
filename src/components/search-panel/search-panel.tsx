"use client";

import style from "./search-panel.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  debounce,
} from "@mui/material";
import CtsButton from "../cts-button/cts-button";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { setSearchPanelHeight, useDispatch } from "@/lib/redux";

export default function SearchPanel(props: any) {
  const dispatch = useDispatch();
  const { children, clickSearch, clickClear } = props;
  const componentRef = useRef(null);

  const [expanded, setExpanded] = useState(true);

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  useEffect(() => {
    if (componentRef && componentRef.current) {
      const ele = componentRef.current as HTMLElement;
      const resizeObserver = new ResizeObserver(
        debounce(() => {
          dispatch(setSearchPanelHeight(ele.clientHeight));
        }, 50)
      );
      resizeObserver.observe(ele);
    }
  }, [dispatch]);

  return (
    <>
      <Accordion
        ref={componentRef}
        expanded={expanded}
        className={style.searchContainer}
        onChange={handleChange}
      >
        <AccordionSummary
          className={style.tilteContainer}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-search"
          id="panel-search"
        >
          <span className={style.searchTitle}>検索条件</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>{children}</div>
          <div className={style.buttonContainer}>
            <CtsButton
              color="success"
              variant="contained"
              startIcon={<SearchIcon sx={{ fontSize: "18px !important" }} />}
              onClick={clickSearch}
            >
              検索
            </CtsButton>
            <CtsButton
              color="primary"
              variant="outlined"
              style={{ marginLeft: "16px" }}
              onClick={clickClear}
            >
              検索条件をクリア
            </CtsButton>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
