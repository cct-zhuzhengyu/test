import { PhoneNumberUtil } from "google-libphonenumber";
import { enqueueSnackbar } from "notistack";

/**
 * null undefined 判断
 */
export function isNullOrUndefined(value: unknown) {
  if (value === undefined || value === null) {
    return true;
  } else {
    return false;
  }
}

/**
 * list エンプティ判断
 */
export function isEmptyList(list: unknown[]) {
  if (list && list.length > 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * object エンプティ判断
 */
export function isEmptyObject(obj: object) {
  if (obj) {
    for (const i in obj) {
      return false;
    }
    return true;
  } else {
    return true;
  }
}

/**
 * 数字判断
 */
export function isNumber(value: string) {
  return new RegExp(/^(-)?(([0-9])|([1-9]([0-9]+)))(.[0-9]+)?$/).test(value);
}

/**
 * メール判断
 */
export function isMail(value: string) {
  return new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$").test(
    value
  );
}

/**
 * 電話番号判断
 */
const phoneNumberUtil = PhoneNumberUtil.getInstance();
const region = "JP";
export function validatePhone(phone: string) {
  try {
    const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
      phone,
      region
    );
    return (
      phoneNumberUtil.isValidNumber(parsedPhoneNumber) &&
      phoneNumberUtil.isValidNumberForRegion(parsedPhoneNumber, region)
    );
  } catch (e) {
    return false;
  }
}

/**
 * メッセージ表示
 */
export function showMsg({
  type,
  msg,
}: {
  type?: "error" | "success" | "info";
  msg: string;
}) {
  if (!type) {
    type = "error";
  }
  enqueueSnackbar(msg, {
    variant: type,
    anchorOrigin: {
      horizontal: "right",
      vertical: "bottom",
    },
  });
}
