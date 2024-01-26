"use client";

import { useState } from "react";
import CtsAutocomplete from "../cts-autocomplete/cts-autocomplete";
import { debounce } from "lodash";
import CtsInputBase from "../cts-input/cts-input-base";

interface SetPlus {
  config: {
    label: string;
    placeholder: string;
    getOptFunc: Function;
    selChgFunc: Function;
    value?: string;
  };
}

export default function CtsSetPlus(props: SetPlus) {
  const config = props.config;

  const [options, setOptions] = useState([]);

  const getOptionsFunc = debounce(
    async (event: React.SyntheticEvent, value: any, reason: any) => {
      if (value) {
        setOptions(await config.getOptFunc(value));
      } else {
        setOptions([]);
      }
    },
    300
  );

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

  return (
    <CtsAutocomplete
      disablePortal
      value={config.value ? config.value : null}
      options={options}
      onInputChange={getOptionsFunc}
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
