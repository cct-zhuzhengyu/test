"use client";

import { Theme } from "@emotion/react";
import {
  FilledTextFieldProps,
  InputBaseComponentProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import { JSX, useEffect } from "react";
import { useImmer } from "use-immer";
import CtsInputBase from "./cts-input-base";
import {
  isMail,
  isNullOrUndefined,
  isNumber,
  validatePhone,
} from "@/lib/utils/utils";

export interface Validations {
  required?: boolean;
  number?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  phone?: boolean;
  email?: boolean;
  pattern?: string;
}

interface InputProps {
  maxLength?: number;
  minLength?: number;
}

export default function CtsInput(
  props: JSX.IntrinsicAttributes & {
    variant?: TextFieldVariants | undefined;
  } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      "variant"
    > & { theme?: Theme | undefined } & {
      onChange?: Function;
      validation?: Validations;
    }
) {
  const [value, setValue] = useImmer(props.value);
  const [inputProps, setInputProps] = useImmer(
    props.inputProps as InputBaseComponentProps | undefined
  );
  const [error, setError] = useImmer(props.error);
  const [helperText, setHelperText] = useImmer(props.helperText);

  useEffect(() => {
    setValue(props.value);
  }, [props.value, setValue]);

  useEffect(() => {
    if (props.validation) {
      const { maxLength, minLength } = props.validation;
      let res = {
        ...props.inputProps,
      } as InputBaseComponentProps;
      if (maxLength !== null && maxLength !== undefined) {
        res.maxLength = maxLength;
      }
      if (minLength !== null && minLength !== undefined) {
        res.minLength = minLength;
      }
      setInputProps(res);
    }
  }, [props.inputProps, props.validation, setInputProps]);

  useEffect(() => {
    setError(props.error);
  }, [props.error, setError]);

  useEffect(() => {
    setHelperText(props.helperText);
  }, [props.helperText, setHelperText]);

  const change = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (props.validation && event?.target.value) {
      if (
        props.validation.number &&
        !new RegExp(/^(-)?((([0-9])|([1-9]([0-9]+)))((.[0-9]+)|(\.))?)?$/).test(
          event?.target.value
        )
      ) {
        return;
      }
      if (props.validation.phone && !/^\d+$/.test(event?.target.value)) {
        return;
      }
    }
    setValue(event?.target.value);
  };

  const blur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (props.value !== value) {
      const isError = !validation();
      if (props.onChange) {
        Object.assign(event, { isError });
        props.onChange(event);
      }
    }
  };

  const validation = (): boolean => {
    if (props.validation) {
      const {
        required,
        number,
        maxLength,
        minLength,
        max,
        min,
        phone,
        email,
        pattern,
      } = props.validation as Validations;
      if (required && !value) {
        setError(true);
        setHelperText(`required`);
        return false;
      }
      if (!isNullOrUndefined(value) && value !== "") {
        const temp = value as string;
        if (number && !isNumber(temp)) {
          setError(true);
          setHelperText(`number`);
          return false;
        }
        if (
          !isNullOrUndefined(maxLength) &&
          temp.length > (maxLength as number)
        ) {
          setError(true);
          setHelperText(`maxLength: ${maxLength}`);
          return false;
        }
        if (
          !isNullOrUndefined(minLength) &&
          temp.length < (minLength as number)
        ) {
          setError(true);
          setHelperText(`minLength: ${minLength}`);
          return false;
        }
        if (!isNullOrUndefined(max) && Number(temp) > (max as number)) {
          setError(true);
          setHelperText(`max: ${max}`);
          return false;
        }
        if (!isNullOrUndefined(min) && Number(temp) < (min as number)) {
          setError(true);
          setHelperText(`min: ${min}`);
          return false;
        }
        if (email) {
          if (!isMail(temp)) {
            setError(true);
            setHelperText(`email`);
            return false;
          }
        }
        if (phone) {
          if (!/^\d+$/.test(temp) || !validatePhone(temp)) {
            setError(true);
            setHelperText(`phone`);
            return false;
          }
        }
        if (email) {
          const emailRegExp = new RegExp(
            "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$"
          );
          if (!emailRegExp.test(temp)) {
            setError(true);
            setHelperText(`email`);
            return false;
          }
        }
        if (pattern) {
          const regExp = new RegExp(pattern);
          if (!regExp.test(temp)) {
            setError(true);
            setHelperText(`pattern: ${pattern}`);
            return false;
          }
        }
      }
    }
    setError(false);
    setHelperText("");
    return true;
  };

  return (
    <>
      <CtsInputBase
        {...props}
        value={value}
        onChange={change}
        onBlur={blur}
        inputProps={inputProps}
        error={error}
        helperText={error ? helperText : ""}
      />
    </>
  );
}
