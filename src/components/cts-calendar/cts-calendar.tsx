// import useClickAway from "@/app/main/useClickAway";
// import CtsInput from "../cts-input/cts-input";
// import React, { useState, useRef, useEffect } from "react";
// import Cal from "@/app/main/about/calendar.svg";
// import Left from "@/app/main/about/left.svg";
// import Right from "@/app/main/about/right.svg";
// import ArrowUp from "@/app/main/about/arrow-up.svg";
// import ArrowDown from "@/app/main/about/arrow-down.svg";
// import { isDate } from "@/app/main/utils";
// import Calendar from "react-calendar";
// import CtsSet from "../cts-set/cts-set";
// import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import CtsTimePicker from "../cts-time-picker/cys-time-picker";
// import { StringIterator } from "lodash";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// let resetFlg = false;
// export default function CtsCalendar(props: any) {
//   const dateKey = props.dateKey;
//   let dateValue = props.dateValue;
//   const fn = props.fn;
//   //   console.log("_________value______value__", dateValue);
//   const [isDateOpen, setIsDateOpen] = useState(false);
//   const [isTimeOpen, setIsTimeOpen] = useState(false);
//   const [dateValueTemp, setDateValueTemp] = useState(props.dateValue);
//   const [isHourClicked, setIsHourClicked] = useState("");
//   const [isMinClicked, setIsMinClicked] = useState("");
//   const [isSecClicked, setIsSecClicked] = useState("");
//   const scrollRef = useRef(null);

//   const [initDate, setInitDate] = useState(new Date(Date.now()));

//   //console.log("_______initDate___________", initDate);

//   const [year, setYear] = useState(
//     new Date(Date.now()).getFullYear().toString()
//     //new Date(dateValue).getFullYear().toString()
//   );

//   const [time, setTime] = useState("00:00:00");
//   // console.log("_______year___________", year);

//   const [day, setDay] = useState(
//     new Date(Date.now()).getDay().toString()
//     //new Date(dateValue).getFullYear().toString()
//   );
//   //   if (year !== new Date(Date.now()).getFullYear().toString()) {
//   //     setYear(new Date(Date.now()).getFullYear().toString());
//   //   }
//   //   if (year !== new Date(dateValue).getFullYear().toString()) {
//   //     setYear(new Date(dateValue).getFullYear().toString());
//   //   }
//   const [date, setDate1] = useState(dateValue);
//   //   if (date !== dateValue) {
//   //     setDate1(dateValue);
//   //   }
//   const [month, setMonth] = useState(
//     new Date(Date.now()).getMonth() + 1 + "月"
//     //new Date(dateValue).getMonth() + 1 + "月"
//   );
//   if (resetFlg) {
//     // setDateValueTemp(
//     //   new Date(Date.now()).toLocaleDateString().replace("-", "/")
//     // );
//     // setMonth(new Date(Date.now()).getMonth() + 1 + "月");
//     // setYear(new Date(Date.now()).getFullYear().toString());
//     // resetFlg = false;
//   }
//   //   if (month !== new Date(dateValue).getMonth() + 1 + "月") {
//   //     setMonth(new Date(dateValue).getMonth() + 1 + "月");
//   //   }

//   const ref = useRef(null);
//   useClickAway(() => {
//     setIsDateOpen(false);
//     setIsTimeOpen(false);
//     setIsHourClicked("");
//     setIsMinClicked("");
//     setIsSecClicked("");
//     setTime("00:00:00");
//     resetFlg = true;
//   }, ref);

//   useEffect(() => {
//     if (scrollRef && scrollRef.current) {
//       //   scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, []);

//   const changeDateInput =
//     (key: string, isBlur: boolean = false) =>
//     (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       fn((item: any) => {
//         if (isBlur) {
//           item[key] = isDate(event.target.value) ? event.target.value : "";
//         } else {
//           item[key] = event.target.value;
//         }
//       });
//     };

//   const changeCalendarInput = (key: string, value: Value) =>
//     fn((item: any) => {
//       //item[key] = getFormattedDate(value as Date, "yyyy/MM/ss");
//       // console.log("______changeCalendarInput_____value_________", value);
//       item[key] =
//         (value as Date)?.toLocaleDateString().replace("-", "/") + " " + time;
//       setDate1((value as Date)?.toLocaleDateString().replace("-", "/"));
//       setDay((value as Date).getDay().toString());
//       setInitDate(new Date(value as Date));
//       setDateValueTemp(
//         new Date(value as Date)?.toLocaleDateString().replace("-", "/")
//       );
//     });

//   const changeCalendarMonth = (action: boolean) => {
//     const preValue =
//       dateValueTemp === ""
//         ? new Date(Date.now()).toLocaleDateString().replace("-", "/")
//         : dateValueTemp;

//     let monthTemp = new Date(preValue).getMonth();
//     let yearTemp = new Date(preValue).getFullYear();
//     if (action) {
//       let tempVal = new Date(Date.now());
//       if (monthTemp === 11) {
//         monthTemp = 0;
//         yearTemp++;
//         tempVal = new Date(
//           new Date(new Date(preValue).setMonth(monthTemp)).setFullYear(yearTemp)
//         );
//       } else {
//         monthTemp++;
//         tempVal = new Date(new Date(preValue).setMonth(monthTemp));
//       }
//       setInitDate(tempVal);
//       setMonth(monthTemp + 1 + "月");

//       setYear(yearTemp.toString());

//       setDateValueTemp(tempVal?.toLocaleDateString().replace("-", "/"));
//     }
//     if (!action) {
//       let tempVal = new Date(Date.now());
//       if (monthTemp === 0) {
//         monthTemp = 11;
//         yearTemp--;
//         tempVal = new Date(
//           new Date(new Date(preValue).setMonth(monthTemp)).setFullYear(yearTemp)
//         );
//       } else {
//         monthTemp--;
//         tempVal = new Date(new Date(preValue).setMonth(monthTemp));
//       }
//       setInitDate(tempVal);
//       setMonth(monthTemp + 1 + "月");

//       setYear(yearTemp.toString());

//       setDateValueTemp(
//         (a: string) => (a = tempVal?.toLocaleDateString().replace("-", "/"))
//       );
//     }
//     // let newMonth =
//     //   new Date(date).getMonth() === 0 && isLeft
//     //     ? 11
//     //     : new Date(date).getMonth() + (isLeft ? -1 : 1);
//     // let nextDate = new Date(date).setMonth(newMonth);
//     // let nextYear = new Date(nextDate).getFullYear();
//     // let nextDay = new Date(nextDate).getDay();
//     // let nextMonth = checkMonth(
//     //   new Date(nextDate).getMonth() + (isLeft ? -1 : 1)
//     // );

//     // let dateAfter = nextYear + "/" + nextMonth + "/" + nextDay;
//     // if (!isDate(dateAfter)) {
//     //   dateAfter = nextYear + "/" + nextMonth + "/1";
//     // }
//     // setDate1(dateAfter);
//   };

//   const getYearList = () => {
//     let yearList = [];
//     for (let index = 0; index < 100; index++) {
//       yearList.push({ label: (1950 + index).toString(), id: 1950 + index });
//     }
//     return yearList;
//   };

//   let hourList = [];
//   for (let index = 0; index < 24; index++) {
//     hourList.push(
//       index.toString().length < 2 ? "0" + index.toString() : index.toString()
//     );
//   }
//   let minSecList = [];
//   for (let index = 0; index < 60; index++) {
//     minSecList.push(
//       index.toString().length < 2 ? "0" + index.toString() : index.toString()
//     );
//   }

//   const getMonthList = () => {
//     return [
//       { label: "1月", id: "1" },
//       { label: "2月", id: "2" },
//       { label: "3月", id: "3" },
//       { label: "4月", id: "4" },
//       { label: "5月", id: "5" },
//       { label: "6月", id: "6" },
//       { label: "7月", id: "7" },
//       { label: "8月", id: "8" },
//       { label: "9月", id: "9" },
//       { label: "10月", id: "10" },
//       { label: "11月", id: "11" },
//       { label: "12月", id: "12" },
//     ];
//   };

//   const selYearList = (value: any) => {
//     console.log("_______selYearList___________", year);
//     //fn((item: any) => {
//     const preValue =
//       dateValueTemp === ""
//         ? new Date(Date.now()).toLocaleDateString().replace("-", "/")
//         : dateValueTemp;
//     //const preValue = item[dateKey].toString();
//     //  const preValue = initDate.toString();
//     const datatoset = new Date(replaceAt(preValue, 0, value.label));
//     setInitDate((a) => (a = datatoset));
//     //console.log("______InitDate________", initDate);
//     //console.log("______datatoset________", datatoset);
//     setYear(
//       (a) =>
//         (a = new Date(replaceAt(preValue, 0, value.label))
//           .getFullYear()
//           .toString())
//     );
//     const asdasd = new Date(replaceAt(preValue, 0, value.label))
//       ?.toLocaleDateString()
//       .replace("-", "/");
//     setDateValueTemp((a: string) => (a = asdasd));
//     //console.log("______dateValue________", dateValueTemp);
//     // item[dateKey] = replaceAt(preValue, 0, value.label);
//     //});
//   };

//   const selMonthList = (value: any) => {
//     //fn((item: any) => {
//     const preValue =
//       dateValueTemp === ""
//         ? new Date(Date.now()).toLocaleDateString().replace("-", "/")
//         : dateValueTemp;
//     //   const preValue = item[dateKey].toString();
//     //   const preValue = initDate.toString();

//     setInitDate(new Date(replaceAt(preValue, 5, value.id, true)));
//     setMonth(
//       new Date(replaceAt(preValue, 5, value.id, true)).getMonth() + 1 + "月"
//     );
//     setDateValueTemp(
//       new Date(replaceAt(preValue, 5, value.id, true))
//         ?.toLocaleDateString()
//         .replace("-", "/")
//     );
//     console.log("______dateValue________", dateValueTemp);
//     // item[dateKey] = replaceAt(preValue, 5, value.id, true);
//     //});
//   };

//   //   console.log(
//   //     "_________value______value__",
//   //     dateValue ? new Date(dateValue).getMonth() : ""
//   //   );

//   return (
//     <div ref={ref}>
//       <div className="input-wrapper">
//         <CtsInput
//           label="datetime"
//           value={dateValue}
//           onChange={changeDateInput(dateKey)}
//           // onFocus={(e) => setIsDateOpen(!isDateOpen)}
//           onBlur={changeDateInput(dateKey, true)}
//         />
//         <div className="cal">
//           <Cal
//             // ref={ref}
//             onClick={() => {
//               if (!isDateOpen) {
//                 setYear(new Date(Date.now()).getFullYear().toString());
//                 setMonth(new Date(Date.now()).getMonth() + 1 + "月");
//                 setDateValueTemp(
//                   new Date(Date.now()).toLocaleDateString().replace("-", "/")
//                 );
//                 setInitDate(new Date(Date.now()));
//                 setTime("00:00:00");
//               }
//               setIsDateOpen(!isDateOpen);
//             }}
//             width="28px"
//             height={28}
//           />
//         </div>
//       </div>
//       {isDateOpen && (
//         <div className="calendar">
//           {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <CtsTimePicker
//               className="time-picker"
//               views={["hours", "minutes", "seconds"]}
//               timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
//               ampm={false}
//             />
//           </LocalizationProvider> */}
//           <div className="input-time-wrapper">
//             <CtsInput
//               value={time}
//               //   onChange={changeDateInput(dateKey)}
//               // onFocus={(e) => setIsDateOpen(!isDateOpen)}
//               //   onBlur={changeDateInput(dateKey, true)}
//             />
//             <div className="arrow">
//               {!isTimeOpen && (
//                 <div className="arrow-down">
//                   <ArrowDown
//                     onClick={() => {
//                       setIsTimeOpen(!isTimeOpen);
//                     }}
//                     width="28px"
//                     height={28}
//                   />
//                 </div>
//               )}
//               {isTimeOpen && (
//                 <div className="arrow-up">
//                   <ArrowUp
//                     onClick={() => {
//                       setIsTimeOpen(!isTimeOpen);
//                       setIsHourClicked("");
//                       setIsMinClicked("");
//                       setIsSecClicked("");
//                     }}
//                     width="28px"
//                     height={28}
//                   />
//                 </div>
//               )}
//             </div>
//             {isTimeOpen && (
//               <div className="time-selector">
//                 <ul ref={scrollRef} className="selector">
//                   {hourList.map((item) => (
//                     <li
//                       onClick={(e) => {
//                         setIsHourClicked(isHourClicked === item ? "" : item);
//                         scrollToViewCenter(e.target);
//                         setTime(replaceTime(time, 0, item));
//                       }}
//                       key={item}
//                       className={
//                         isHourClicked === item
//                           ? "selector-li-clicked"
//                           : "selector-li"
//                       }
//                     >
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//                 <ul className="selector">
//                   {minSecList.map((item) => (
//                     <li
//                       onClick={(e) => {
//                         setIsMinClicked(isMinClicked === item ? "" : item);
//                         scrollToViewCenter(e.target);
//                         setTime(replaceTime(time, 3, item));
//                       }}
//                       key={item}
//                       className={
//                         isMinClicked === item
//                           ? "selector-li-clicked"
//                           : "selector-li"
//                       }
//                     >
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//                 <ul className="selector">
//                   {minSecList.map((item) => (
//                     <li
//                       onClick={(e) => {
//                         setIsSecClicked(isSecClicked === item ? "" : item);
//                         scrollToViewCenter(e.target);
//                         setTime(replaceTime(time, 6, item));
//                       }}
//                       key={item}
//                       className={
//                         isSecClicked === item
//                           ? "selector-li-clicked"
//                           : "selector-li"
//                       }
//                     >
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className="year-month">
//             <Left
//               className="month-prev"
//               onClick={() => {
//                 changeCalendarMonth(false);
//               }}
//               width="32px"
//               height={32}
//             />
//             <div className="year-month-flex">
//               <CtsSet
//                 config={{
//                   disableClearable: true,
//                   label: "",
//                   placeholder: "year",
//                   optionsArry: getYearList(),
//                   selChgFunc: selYearList,
//                   value: year ? year : "",
//                   //   value: dateValue ? year : "",
//                 }}
//               />
//             </div>
//             <CtsSet
//               config={{
//                 disableClearable: true,
//                 label: "",
//                 placeholder: "month",
//                 optionsArry: getMonthList(),
//                 selChgFunc: selMonthList,
//                 value: month ? month : "",
//                 // value: dateValue ? month : "",
//               }}
//             />
//             <Right
//               className="month-next"
//               onClick={() => {
//                 changeCalendarMonth(true);
//               }}
//               width="32px"
//               height={32}
//             />
//           </div>
//           <Calendar
//             className="calendarWidth"
//             onChange={(val) => {
//               changeCalendarInput(dateKey, val);
//             }}
//             formatDay={(_locale, date) => {
//               return date.getDate().toString();
//             }}
//             // onActiveStartDateChange={({
//             //   action,
//             //   activeStartDate,
//             //   value,
//             //   view,
//             // }) => {
//             //   const preValue =
//             //     dateValueTemp === ""
//             //       ? new Date(Date.now()).toLocaleDateString().replace("-", "/")
//             //       : dateValueTemp;

//             //   let monthTemp = new Date(preValue).getMonth();
//             //   let yearTemp = new Date(preValue).getFullYear();
//             //   if (action === "next") {
//             //     let tempVal = new Date(Date.now());
//             //     if (monthTemp === 11) {
//             //       monthTemp = 0;
//             //       yearTemp++;
//             //       tempVal = new Date(
//             //         new Date(
//             //           new Date(preValue).setMonth(monthTemp)
//             //         ).setFullYear(yearTemp)
//             //       );
//             //     } else {
//             //       monthTemp++;
//             //       tempVal = new Date(new Date(preValue).setMonth(monthTemp));
//             //     }
//             //     setInitDate((a) => (a = tempVal));
//             //     setMonth((a) => (a = monthTemp + 1 + "月"));

//             //     setYear((a) => (a = yearTemp.toString()));

//             //     setDateValueTemp(
//             //       (a: string) =>
//             //         (a = tempVal?.toLocaleDateString().replace("-", "/"))
//             //     );
//             //   }
//             //   if (action === "prev") {
//             //     let tempVal = new Date(Date.now());
//             //     if (monthTemp === 0) {
//             //       monthTemp = 11;
//             //       yearTemp--;
//             //       tempVal = new Date(
//             //         new Date(
//             //           new Date(preValue).setMonth(monthTemp)
//             //         ).setFullYear(yearTemp)
//             //       );
//             //     } else {
//             //       monthTemp--;
//             //       tempVal = new Date(new Date(preValue).setMonth(monthTemp));
//             //     }
//             //     setInitDate((a) => (a = tempVal));
//             //     setMonth((a) => (a = monthTemp + 1 + "月"));

//             //     setYear((a) => (a = yearTemp.toString()));

//             //     setDateValueTemp(
//             //       (a: string) =>
//             //         (a = tempVal?.toLocaleDateString().replace("-", "/"))
//             //     );
//             //   }
//             //   //   const asd = "New view is: " + action;
//             //   //   alert(asd);
//             // }}
//             onClickDay={() => setIsDateOpen(false)}
//             //value={new Date(Date.now())}
//             value={initDate}
//             // value={isDate(dateValue) ? dateValue : ""}
//             locale="ja"
//             showNavigation={false}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// function replaceAt(
//   str: string,
//   index: number,
//   replacement: string,
//   isMonth: boolean = false
// ) {
//   const dateAfterReplace =
//     str.substring(0, index) +
//     replacement +
//     str.substring((isMonth ? 1 : replacement.length) + index);
//   let data = dateAfterReplace.split("/");
//   if (isMonth) {
//     data[1] = replacement;
//   }
//   if (!isDate(dateAfterReplace)) {
//     data[2] = "1";
//   }
//   return data.join("/");
// }

// function replaceTime(str: string, index: number, replacement: string) {
//   return (
//     str.substring(0, index) +
//     replacement +
//     str.substring(replacement.length + index)
//   );
// }

// function checkMonth(i: number) {
//   if (i < 10) {
//     return "0" + i;
//   } else {
//     return i.toString();
//   }
// }

// function getWindowScrollTop(el: any) {
//   var scroll_top = 0;
//   if (el.parentElement && el.parentElement.scrollTop) {
//     scroll_top = el.parentElement.scrollTop;
//   }
//   //   else if (document.body) {
//   //     scroll_top = document.body.scrollTop;
//   //   }
//   return scroll_top;
// }

// function scrollToViewCenter(el: any) {
//   el.parentElement.scrollTo({
//     top: el.offsetTop - 116 + el.offsetHeight / 2,
//     behavior: "smooth",
//   });
// }
