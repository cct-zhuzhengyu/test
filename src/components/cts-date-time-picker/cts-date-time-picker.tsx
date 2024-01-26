"use client";

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import moment from "moment";
import styles from "./cts-date-time-picker.module.scss";
import CalendarIcon from "@/assets/icons/Calendar.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CtsInput from "../cts-input/cts-input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { CalendarDate } from "./calendar-date";

const startYear = 1900;
const endYear = 2100;
const formatDateAndTime = "YYYY/MM/DD HH:mm:ss";
const formatDate = "YYYY/MM/DD";
const formatTime = "HH:mm:ss";

// 年の選択肢
const yearList = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => startYear + i
);
// 月の選択肢
const monthList = Array.from({ length: 12 }, (_, i) => 1 + i);
// 週の選択肢
const weekList = ["日", "月", "火", "水", "木", "金", "土"];
// 時間の選択肢
const hourList: number[] = [];
const minuteList: number[] = [];
const secondList: number[] = [];
// 時間の選択肢のスクロール範囲
const hourScrollRange: object[] = [];
const minAndSecScrollRange: object[] = [];

Array.from({ length: 24 }, (_, i) => {
  hourList.push(i);
  hourScrollRange.push({
    start: i === 0 ? 0 : (i - 1) * 32 + 19,
    end: i * 32 + 18,
    value: i,
  });
});

Array.from({ length: 60 }, (_, i) => {
  minuteList.push(i);
  secondList.push(i);
  minAndSecScrollRange.push({
    start: i === 0 ? 0 : (i - 1) * 32 + 19,
    end: i * 32 + 18,
    value: i,
  });
});

export interface CtsDateTimePickerProps {
  label: string;
  value: string;
  type: "date" | "datetime";
  disabled?: boolean;
  onChange: Function;
}

export default function CtsDateTimePicker(props: CtsDateTimePickerProps) {
  const [dateTimeValue, setDateTimeValue] = useState(props.value);
  const [selectYear, setSelectYear] = useState(startYear.toString());
  const [selectMonth, setSelectMonth] = useState("1");
  const [selectDay, setSelectDay] = useState(1);
  const [dayList, setDayList] = useState<Array<CalendarDate[]>>([]);
  const [timeValue, setTimeValue] = useState("00:00:00");
  const [selectHour, setSelectHour] = useState(0);
  const [selectMinute, setSelectMinute] = useState(0);
  const [selectSecond, setSelectSecond] = useState(0);
  const [isVerticalTop, serIsVerticalTop] = useState(true); // TODO
  const isShowTime = props.type === "datetime";
  const formatRule = isShowTime ? formatDateAndTime : formatDate;
  const hourListRef = useRef<HTMLUListElement>(null);
  const minuteListRef = useRef<HTMLUListElement>(null);
  const secondListRef = useRef<HTMLUListElement>(null);

  // 日時ピッカーの開閉
  const [datePickerAnchorEl, setDatePickerAnchorEl] =
    useState<null | HTMLElement>(null);
  const datePickerOpen = Boolean(datePickerAnchorEl);

  // 時間ピッカーの開閉
  const [timePickerAnchorEl, setTimePickerAnchorEl] =
    useState<null | HTMLElement>(null);
  const timePickerOpen = Boolean(timePickerAnchorEl);

  /**
   * input入力フォーマット
   */
  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    // 不正な値なら空値で上書き
    const isValidDate = moment(event.target.value).isValid();
    console.log("blurInput", isValidDate);
    if (isValidDate) {
      setDateTimeValue(moment(event.target.value).format(formatRule));
    } else {
      setDateTimeValue("");
    }
  };

  /**
   * 日時ピッカーを開く
   * @param event
   */
  const clickOpenDatePick = (event: MouseEvent<HTMLButtonElement>) => {
    if (props.disabled) {
      return;
    }
    let momentValue = moment();
    if (dateTimeValue && dateTimeValue !== "") {
      momentValue = moment(dateTimeValue, formatRule);
    }
    setSelectYear(momentValue.year().toString());
    setSelectMonth((momentValue.month() + 1).toString());
    setSelectDay(momentValue.date());
    if (isShowTime) {
      setTimeValue(momentValue.format(formatTime));
      setSelectHour(momentValue.hour());
      setSelectMinute(momentValue.minute());
      setSelectSecond(momentValue.second());
    }
    setCalendar(momentValue.year(), momentValue.month() + 1);
    setDatePickerAnchorEl(event.currentTarget);
  };

  /**
   * 日時ピッカーを閉じる
   * @param event
   */
  const closeDatePick = () => {
    setDatePickerAnchorEl(null);
  };

  /**
   * 前月ボタンをクリック
   */
  const clickPrevMonth = () => {
    const prevMonth = Number(selectMonth) - 1;
    if (prevMonth < 1) {
      setSelectMonth("12");
      setSelectYear((Number(selectYear) - 1).toString());
      setCalendar(Number(selectYear) - 1, 12);
    } else {
      setSelectMonth(prevMonth.toString());
      setCalendar(Number(selectYear), prevMonth);
    }
  };

  /**
   * 来月ボタンをクリック
   */
  const clickNextMonth = () => {
    const nextMonth = Number(selectMonth) + 1;
    if (nextMonth > 12) {
      setSelectMonth("1");
      setSelectYear((Number(selectYear) + 1).toString());
      setCalendar(Number(selectYear) + 1, 1);
    } else {
      setSelectMonth(nextMonth.toString());
      setCalendar(Number(selectYear), nextMonth);
    }
  };

  /**
   * 年の選択
   */
  const changeSelectYear = (event: SelectChangeEvent) => {
    setSelectYear(event.target.value);
    setCalendar(Number(event.target.value), Number(selectMonth));
  };

  /**
   * 月の選択
   */
  const changeSelectMonth = (event: SelectChangeEvent) => {
    setSelectMonth(event.target.value);
    setCalendar(Number(selectYear), Number(event.target.value));
  };

  /**
   * 日付の選択
   */
  const changeSelectDay = (dayInfo: CalendarDate) => {
    if (dayInfo.disabled) {
      return;
    }
    setSelectDay(dayInfo.value);
    let momentValue =
      dateTimeValue !== "" ? moment(dateTimeValue, formatRule) : moment();
    setDateTimeValue(
      momentValue
        .year(Number(selectYear))
        .month(Number(selectMonth) - 1)
        .date(dayInfo.value)
        .format(formatRule)
    );
    props.onChange(dateTimeValue);
    closeDatePick();
  };

  /**
   * 選択するかどうかを判定
   */
  const isSelected = (dayInfo: CalendarDate) => {
    const momentValue = moment(dateTimeValue, formatRule);
    return (
      momentValue.year().toString() == selectYear &&
      (momentValue.month() + 1).toString() == selectMonth &&
      !dayInfo.disabled &&
      dayInfo.value === selectDay
    );
  };

  /**
   * 日付リストの作成
   * @param year 年
   * @param month 月
   */
  const setCalendar = (year: number, month: number) => {
    const lastDayOfThisMonth = moment()
      .year(year)
      .month(month - 1)
      .endOf("month");
    const lastDayOfPreMonth = moment()
      .year(year)
      .month(month - 2)
      .endOf("month");

    // 1週目
    const calendar = new Array<CalendarDate[]>();
    let currentDay = 1;
    if (lastDayOfPreMonth.day() !== 6) {
      const firstWeek = new Array<CalendarDate>();
      for (let i = lastDayOfPreMonth.day(); 0 <= i; i--) {
        firstWeek[i] = new CalendarDate(lastDayOfPreMonth.date(), true);
        lastDayOfPreMonth.date(lastDayOfPreMonth.date() - 1);
      }
      for (currentDay; firstWeek.length < 7; currentDay++) {
        firstWeek.push(new CalendarDate(currentDay));
      }
      calendar.push(firstWeek);
    }
    // 2週目以降
    while (currentDay <= lastDayOfThisMonth.date()) {
      const week = new Array<CalendarDate>();
      for (let i = 0; i < 7 && currentDay <= lastDayOfThisMonth.date(); i++) {
        week.push(new CalendarDate(currentDay));
        currentDay++;
      }
      calendar.push(week);
    }
    // 最終週
    const lastWeek = calendar.pop()!;
    for (let i = 1; lastWeek.length < 7; i++) {
      lastWeek.push(new CalendarDate(i, true));
    }
    calendar.push(lastWeek);
    // 今日を判定
    const today = moment();
    if (today.year() === year && today.month() + 1 === month) {
      calendar[today.week() - 1].forEach((day) => {
        if (day.value === today.date()) {
          day.today = true;
        }
      });
    }
    // カレンダーを表示する
    setDayList(calendar);
  };

  /**
   * 時間ピッカーを開く
   * @param event
   */
  const clickOpenTimePick = (event: MouseEvent<HTMLDivElement>) => {
    setTimePickerAnchorEl(event.currentTarget);
    setTimeout(() => {
      if (hourListRef.current) {
        hourListRef.current.scrollTo({
          top: selectHour * 32,
        });
      }
      if (minuteListRef.current) {
        minuteListRef.current.scrollTo({
          top: selectMinute * 32,
        });
      }
      if (secondListRef.current) {
        secondListRef.current.scrollTo({
          top: selectSecond * 32,
        });
      }
    }, 0);
  };

  /**
   * 時間ピッカーを閉じる
   * @param event
   */
  const closeTimePick = () => {
    setTimePickerAnchorEl(null);
  };

  /**
   * 「時」、「分」、「秒」選択
   */
  const timeSelect = (type: string, value: number) => {
    let listNode = null;
    const momentTime = moment(timeValue, formatTime);
    const momentValue =
      dateTimeValue !== ""
        ? moment(dateTimeValue, formatRule)
        : moment()
            .year(Number(selectYear))
            .month(Number(selectMonth) - 1)
            .date(Number(selectDay));
    if (type === "hour") {
      listNode = hourListRef.current;
      setSelectHour(value);
      setTimeValue(momentTime.hour(value).format(formatTime));
      setDateTimeValue(momentValue.hour(value).format(formatRule));
    } else if (type === "minute") {
      listNode = minuteListRef.current;
      setSelectMinute(value);
      setTimeValue(momentTime.minute(value).format(formatTime));
      setDateTimeValue(momentValue.minute(value).format(formatRule));
    } else if (type === "second") {
      listNode = secondListRef.current;
      setSelectSecond(value);
      setTimeValue(momentTime.second(value).format(formatTime));
      setDateTimeValue(momentValue.second(value).format(formatRule));
    }
    if (listNode) {
      listNode.scrollTo({
        behavior: "smooth",
        top: value * 32,
      });
    }
    props.onChange(dateTimeValue);
  };

  /**
   * 「時」スクロール　TODO
   */
  const timeHourScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    console.log("timeHourScroll", event.currentTarget.scrollTop);
  };

  /**
   * 「分」スクロール　TODO
   */
  const timeMinuteScroll = (
    event: React.UIEvent<HTMLUListElement, UIEvent>
  ) => {
    console.log("timeMinuteScroll", event.currentTarget.scrollTop);
  };

  /**
   * 「秒」スクロール　TODO
   */
  const timeSecondScroll = (
    event: React.UIEvent<HTMLUListElement, UIEvent>
  ) => {
    console.log("timeSecondScroll", event.currentTarget.scrollTop);
  };

  useEffect(() => {});

  return (
    <div className={styles.dateTimePickerContainer}>
      <CtsInput
        label={props.label}
        value={dateTimeValue}
        onChange={changeInput}
        id="date-time-picker-input"
        className={styles.dateTimePickerInput + " " + "Mui-focused"}
        disabled={props.disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ p: 0.75 }} onClick={clickOpenDatePick}>
                <CalendarIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        id="date-time-picker-menu"
        aria-labelledby="date-time-picker-input"
        anchorEl={datePickerAnchorEl}
        open={datePickerOpen}
        onClose={closeDatePick}
        className={styles.dateTimePickerMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isShowTime && (
          <div className={styles.timeContainer}>
            <CtsInput
              id="time-input"
              value={timeValue}
              className={[
                styles.timeInput,
                timePickerOpen ? styles.timeInputOpen : "",
              ].join(" ")}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {timePickerOpen ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </InputAdornment>
                ),
              }}
              onClick={clickOpenTimePick}
            />
            <Menu
              id="time-picker-menu"
              aria-labelledby="time-input"
              anchorEl={timePickerAnchorEl}
              open={timePickerOpen}
              onClose={closeTimePick}
              className={styles.timePickerMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <ul
                ref={hourListRef}
                className={styles.timeSelectUl}
                onScroll={timeHourScroll}
              >
                {hourList.map((hour) => (
                  <li
                    key={hour}
                    onClick={() => timeSelect("hour", hour)}
                    className={selectHour === hour ? styles.active : ""}
                  >
                    {hour}
                  </li>
                ))}
              </ul>
              <ul
                ref={minuteListRef}
                className={styles.timeSelectUl}
                onScroll={timeMinuteScroll}
              >
                {minuteList.map((minute) => (
                  <li
                    key={minute}
                    onClick={() => timeSelect("minute", minute)}
                    className={selectMinute === minute ? styles.active : ""}
                  >
                    {minute}
                  </li>
                ))}
              </ul>
              <ul
                ref={secondListRef}
                className={styles.timeSelectUl}
                onScroll={timeSecondScroll}
              >
                {secondList.map((second) => (
                  <li
                    key={second}
                    onClick={() => timeSelect("second", second)}
                    className={selectSecond === second ? styles.active : ""}
                  >
                    {second}
                  </li>
                ))}
              </ul>
            </Menu>
          </div>
        )}
        <div className={styles.yearMonthContainer}>
          <IconButton sx={{ p: 0.75, mr: 2 }} onClick={clickPrevMonth}>
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Select
            id="select-year"
            value={selectYear}
            sx={{ width: 95, height: 28, mr: 0.75 }}
            onChange={changeSelectYear}
            className={styles.selectYearMonth}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {yearList.map((year) => (
              <MenuItem key={year} value={year} sx={{ fontSize: 14 }}>
                {year}年
              </MenuItem>
            ))}
          </Select>
          <Select
            id="select-month"
            value={selectMonth}
            sx={{ width: 85, height: 28 }}
            onChange={changeSelectMonth}
            className={styles.selectYearMonth}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {monthList.map((month) => (
              <MenuItem key={month} value={month} sx={{ fontSize: 14 }}>
                {month}月
              </MenuItem>
            ))}
          </Select>
          <IconButton sx={{ p: 0.75, ml: 2 }} onClick={clickNextMonth}>
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </div>
        <div className={styles.dayDisplayContainer}>
          <div className={styles.calendarRow}>
            {weekList.map((week) => (
              <div
                key={week}
                className={styles.calendarCol + " " + styles.weekBold}
              >
                {week}
              </div>
            ))}
          </div>
          {dayList.map((days, index) => (
            <div key={index} className={styles.calendarRow}>
              {days.map((day) => (
                <div
                  key={day.value}
                  className={[
                    styles.calendarCol,
                    styles.dayCol,
                    day.disabled ? styles.dayDisabled : null,
                    day.today ? styles.today : null,
                    isSelected(day) ? styles.selected : null,
                  ].join(" ")}
                  onClick={() => changeSelectDay(day)}
                >
                  {day.value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Menu>
    </div>
  );
}
