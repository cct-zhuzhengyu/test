"use client";

import { useRef, useEffect } from "react";
import CtsAutocomplete from "../cts-autocomplete/cts-autocomplete";
import CtsInputBase from "../cts-input/cts-input-base";

interface Set {
  config: {
    label: string;
    placeholder: string;
    optionsArry: any;
    selChgFunc: Function;
    value: string;
    disableClearable?:boolean
  };
}

export default function CtsSet(props: Set) {
  const config = props.config;

  const myElement = useRef(null);

  const selectChangeFunc = (
    event: React.SyntheticEvent,
    value: any,
    reason: any,
    details?: any
  ) => {
    config.selChgFunc(value);
  };

  const setMatchRule = (option: unknown, value: unknown) => {
    return (option as { label: string }).label === value;
  };

  useEffect(() => {
    if (myElement && myElement.current) {
      const ele = myElement.current as HTMLElement;
      const processEle = ele.querySelector("input");
      if (processEle) {
        processEle.setAttribute("readOnly", "readOnly");
      }
    }
  }, []);

  if(config.disableClearable){
    return (
      <CtsAutocomplete
      disableClearable
        ref={myElement}
        disablePortal
        value={config.value ? config.value : null}
        options={config.optionsArry}
        onChange={selectChangeFunc}
        isOptionEqualToValue={setMatchRule}
        renderInput={(params) => (
          <CtsInputBase
            label={config.label}
            placeholder={config.placeholder}
            {...params}
          />
        )}
      />
    );
  }else{
    return (
      <CtsAutocomplete
        ref={myElement}
        disablePortal
        value={config.value ? config.value : null}
        options={config.optionsArry}
        onChange={selectChangeFunc}
        isOptionEqualToValue={setMatchRule}
        renderInput={(params) => (
          <CtsInputBase
            label={config.label}
            placeholder={config.placeholder}
            {...params}
          />
        )}
      />
    );
  }
}
