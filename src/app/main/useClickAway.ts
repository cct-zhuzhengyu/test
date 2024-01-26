import { get } from "lodash";
import { useEffect } from "react";

function useClickAway(fn: any, ref: any) {
  useEffect(() => {
    const listener = (e: any) => {
      // console.log("_______ref.current________", ref.current);
      // console.log("_______target________", e.target);
      let isTimeOpen = true;
      if (
        !ref.current ||
        ref.current.contains(e.target) ||
        (!isSvg(e.target) && e.target.className.indexOf("react-calendar") > -1)
      )
        return;

      if (!isSvg(e.target) && e.target.className.indexOf("calendar") > -1) {
        isTimeOpen = false;
      }
      let parentNode = e.target.parentNode;
      while (parentNode) {
        const parentClassListValue = getClassListValue(parentNode);
        // console.log(
        //   "_______parentClassListValue________",
        //   parentClassListValue
        // );
        if (parentClassListValue.includes("calendar")) {
          isTimeOpen = false;
        }
        if (
          parentClassListValue.includes("arrow-up") ||
          parentClassListValue.includes("arrow-down") ||
          parentClassListValue.includes("MuiPickersPopper-root") ||
          parentClassListValue.includes("year-month") ||
          parentClassListValue.includes("MuiAutocomplete-listbox")
        ) {
          return;
        }
        parentNode = parentNode.parentNode;
      }
      fn();
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

function isSvg(target: any) {
  return target instanceof SVGElement;
}

/**
 * クリックした項目のclass取得
 */
function getClassListValue(target: EventTarget): string {
  let classListValue = "";
  const classList = get(target, "classList");
  if (classList) {
    classListValue = get(classList, "value");
  }
  return classListValue;
}

export default useClickAway;
