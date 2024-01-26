/**
 * Dateオブジェクトを任意の文字列でフォーマットする
 * @param date Dateオブジェクト
 * @param format 任意の文字列(yyyy-MM-ddなど)
 * @returns
 */
export function getFormattedDate(date: Date, format: string): string {
  const symbol = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  };

  const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) =>
    (
      (v.length > 1 ? "0" : "") + symbol[v.slice(-1) as keyof typeof symbol]
    ).slice(-2)
  );

  return formatted.replace(/(y+)/g, (v) =>
    date.getFullYear().toString().slice(-v.length)
  );
}

export function isDate(strInputDate: string) {
  if (strInputDate == "") return false;
  strInputDate = strInputDate.replace(/-/g, "/");
  const d = new Date(strInputDate);
  if (isNaN(d.getTime())) return false;
  const arr = strInputDate.split("/");
  return (
    parseInt(arr[0], 10) == d.getFullYear() &&
    parseInt(arr[1], 10) == d.getMonth() + 1 &&
    parseInt(arr[2], 10) == d.getDate()
  );
}
