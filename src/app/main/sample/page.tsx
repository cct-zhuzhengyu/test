"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from "@mui/material";
import SearchPanel from "@/components/search-panel/search-panel";
import CtsInput from "@/components/cts-input/cts-input";
//import Calendar from "@/components/Calendar";
import CtsCheckbox from "@/components/cts-checkbox/cts-checkbox";
import { useImmer } from "use-immer";
import { GridColDef } from "@mui/x-data-grid";
import CtsDataGrid from "@/components/cts-data-grid/cts-data-grid";
import CtsPagination, {
  PageOpt,
} from "@/components/cts-pagination/cts-pagination";
import CtsSetPlus from "@/components/cts-set-plus/cts-set-plus";
import { isDate } from "../utils";
import useClickAway from "../useClickAway";
//import CtsCalendar from "@/components/cts-calendar/cts-calendar";
import {
  selectClientSize,
  selectPageHeight,
  setLoading,
  setPageInfo,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import CtsDateTimePicker from "@/components/cts-date-time-picker/cts-date-time-picker";

const seachObjInit = {
  start: "",
  end: "",
  telStatus: [],
  literalMethod: [],
  business: "",
  dateTime: "",
  dateTime2: "",
  operatorId: "",
  transfer: [],
  callerTel: "",
  caller: [],
  destinationTel: "",
  destination: [],
};

const columns: GridColDef[] = [
  {
    field: "field1",
    headerName: "発信元電話番号",
    width: 160,
    valueGetter: ({ row }) => {
      return row.field1;
    },
  },
  {
    field: "field2",
    headerName: "発信者",
    width: 120,
  },
  {
    field: "field3",
    headerName: "発信先電話番号",
    width: 160,
  },
  {
    field: "field4",
    headerName: "発信先",
    width: 120,
  },
  {
    field: "field5",
    headerName: "通話ステータス",
    width: 160,
  },
  {
    field: "field6",
    headerName: "事業者名",
    width: 200,
  },
  {
    field: "field7",
    headerName: "オペレータID",
    width: 220,
  },
  {
    field: "field8",
    headerName: "転送の有無",
    width: 118,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "field9",
    headerName: "利用開始日時",
    width: 180,
  },
  {
    field: "field10",
    headerName: "通話開始日時",
    width: 180,
  },
  {
    field: "field11",
    headerName: "通話終了日時",
    width: 180,
  },
  {
    field: "field12",
    headerName: "利用終了日時",
    width: 180,
  },
  {
    field: "field13",
    headerName: "通話時間",
    width: 150,
  },
  {
    field: "field14",
    headerName: "利用時間",
    width: 150,
  },
];
let rows: any = [];
for (let i = 1; i < 201; i++) {
  rows.push({
    id: i,
    field1: "05012345678" + i,
    field2: "利用者" + i,
    field3: "08012345678" + i,
    field4: "緊急通報",
    field5: "成立",
    field6: "事業者XXXXXXXXXX" + i,
    field7: "operatorID1, operatorID" + i,
    field8: "〇",
    field9: "2023/11/01 11:00:00",
    field10: "2023/11/01 14:00:00",
    field11: "2023/11/01 14:01:30",
    field12: "2023/11/01 12:07:45",
    field13: "1時間58分15秒",
    field14: "2時間01分30秒",
  });
}

export default function Sample() {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const dispatch = useDispatch();
  const pageHeight = useSelector(selectPageHeight);
  const { searchPanelHeight } = useSelector(selectClientSize);

  const [data, setData] = useImmer([]);
  const [searchObj, setSearchObj] = useImmer(seachObjInit);

  useEffect(() => {
    dispatch(
      setPageInfo({
        title: "通話履歴一覧Sample",
      })
    );
  }, [dispatch]);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(() => {
    setIsDateOpen(false);
  }, ref);

  /**
   * 検索
   */
  const clickSearch = () => {
    console.log("検索条件");
    console.log(searchObj);
    fetchData();
  };

  /**
   * 検索条件クリア
   */
  const clickClear = () => {
    setSearchObj(seachObjInit);
  };

  /**
   * API TEST METHOD
   */
  async function fetchData() {
    try {
      dispatch(setLoading(true));
      // TODO
      // const response = (await apiAxiosGet("/sample", {
      //   page: 1,
      //   limit: 10,
      // })) as {
      //   list: [];
      //   page: number;
      //   totalCount: number;
      //   totalPage: number;
      // };
      // setData(response.list);
      // setPage((item) => {
      //   item.page = response.page;
      //   item.totalCount = response.totalCount;
      //   item.totalPage = response.totalPage;
      // });
      setData(rows);
      setPage((item) => {
        item.totalCount = 1010;
        item.totalPage = 11;
      });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  /**
   * input変更 値設定
   */
  const changeInput =
    (key: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchObj((item: any) => {
        item[key] = event.target.value;
      });
    };

  const changeDateInput =
    (key: string, isBlur: boolean = false) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchObj((item: any) => {
        if (isBlur) {
          item[key] = isDate(event.target.value) ? event.target.value : "";
        } else {
          item[key] = event.target.value;
        }
      });
    };

  const changeCalendarInput = (key: string, value: Value) =>
    setSearchObj((item: any) => {
      //item[key] = getFormattedDate(value as Date, "yyyy/MM/ss");
      item[key] = (value as Date)?.toLocaleDateString().replace("-", "/");
    });

  /**
   * チェック判断
   */
  const isChecked = (obj: any, key: string) => {
    return obj.indexOf(key) > -1;
  };

  /**
   * checkbox変更 値設定
   */
  const changeCheckboxGroup =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSearchObj((item: any) => {
          if (item[key].indexOf(event.target.name) === -1) {
            item[key].push(event.target.name);
          }
        });
      } else {
        setSearchObj((item: any) => {
          const index = item[key].indexOf(event.target.name);
          if (index > -1) {
            item[key].splice(index, 1);
          }
        });
      }
    };

  const getOptFunc4Business = (param: string) => {
    // TODO
    // const response = await axios.get("http://localhost:8080/user");
    const response = [
      { col1: "The Shawshank Redemption", col2: "--1", col3: "b1" },
      { col1: "The Godfather", col2: "--2", col3: "b2" },
      { col1: "The Godfather: Part II", col2: "--3", col3: "b3" },
      { col1: "The Dark Knight", col2: "--4", col3: "b4" },
    ];
    if (response && response.length > 0) {
      return response.map((x) => ({ label: x.col1 + x.col2, value: x }));
    }
    return [];
  };

  const selChgFunc4Business = (value: any) => {
    setSearchObj((item: any) => {
      item["business"] = value ? value.label : "";
      // TODO
      // item["business_response_xxx"] = value ? value.value.xxx : "";
    });
  };

  const [page, setPage] = useImmer({
    page: 1,
    perPage: 100,
    totalCount: 0,
    totalPage: 0,
  } as PageOpt);

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage((item) => {
      item.page = value;
    });
  };

  const dateStartChange = (date: string) => {
    setSearchObj((item) => {
      item.start = date;
    });
  };

  const dateEndChange = (date: string) => {
    setSearchObj((item) => {
      item.end = date;
    });
  };

  return (
    <div className="layout-container">
      <SearchPanel clickSearch={clickSearch} clickClear={clickClear}>
        <Grid container rowSpacing={"24px"} columnSpacing={"16px"}>
          <Grid item xs={3}>
            <CtsDateTimePicker
              label="日時"
              type="datetime"
              value={seachObjInit.start}
              onChange={dateStartChange}
            ></CtsDateTimePicker>
            {/* <CtsCalendar
              dateKey="dateTime"
              dateValue={searchObj.dateTime}
              fn={setSearchObj}
            /> */}
            {/* <div ref={ref}>
              {" "}
              <div className="input-wrapper">
                <CtsInput
                  label="datetime"
                  value={searchObj.dateTime}
                  onChange={changeDateInput("dateTime")}
                  // onFocus={(e) => setIsDateOpen(!isDateOpen)}
                  onBlur={changeDateInput("dateTime", true)}
                />
                <div className="cal">
                  <Cal
                    // ref={ref}
                    onClick={() => setIsDateOpen(!isDateOpen)}
                    width="28px"
                    height={28}
                  />
                </div>
              </div>
              {isDateOpen && (
                <div className="calendar">
                  <Calendar
                    className="calendarWidth"
                    onChange={(value) => {
                      console.log("_____________", value);
                      changeCalendarInput("dateTime", value);
                    }}
                    onClickDay={() => setIsDateOpen(false)}
                    value={isDate(searchObj.dateTime) ? searchObj.dateTime : ""}
                    locale="ja"
                  />
                </div>
              )}
            </div> */}
          </Grid>
          <Grid item xs={3}>
            {/* <CtsCalendar
              dateKey="dateTime2"
              dateValue={searchObj.dateTime2}
              fn={setSearchObj}
            /> */}
          </Grid>
          <Grid item xs={3}>
            <CtsDateTimePicker
              label="日付"
              type="date"
              value={seachObjInit.end}
              onChange={dateEndChange}
            ></CtsDateTimePicker>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormGroup className="radio-check-group">
                <FormLabel component="div" className="radio-check-group-title">
                  通話ステータス
                </FormLabel>
                <div className="radio-check-group-content">
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="成立"
                        checked={isChecked(searchObj.telStatus, "成立")}
                        onChange={changeCheckboxGroup("telStatus")}
                      />
                    }
                    label="成立"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="不成立"
                        checked={isChecked(searchObj.telStatus, "不成立")}
                        onChange={changeCheckboxGroup("telStatus")}
                      />
                    }
                    label="不成立"
                  />
                </div>
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormGroup className="radio-check-group">
                <FormLabel component="div" className="radio-check-group-title">
                  文字化方法
                </FormLabel>
                <div className="radio-check-group-content">
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="オペレータ"
                        checked={isChecked(
                          searchObj.literalMethod,
                          "オペレータ"
                        )}
                        onChange={changeCheckboxGroup("literalMethod")}
                      />
                    }
                    label="オペレータ"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="音声認識"
                        checked={isChecked(searchObj.literalMethod, "音声認識")}
                        onChange={changeCheckboxGroup("literalMethod")}
                      />
                    }
                    label="音声認識"
                  />
                </div>
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <CtsSetPlus
              config={{
                label: "事業者",
                placeholder: "事業者名または事業者IDを入力してください",
                getOptFunc: getOptFunc4Business,
                selChgFunc: selChgFunc4Business,
                value: searchObj.business,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CtsInput
              label="オペレータID"
              value={searchObj.operatorId}
              onChange={changeInput("operatorId")}
              validation={{
                number: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormGroup className="radio-check-group">
                <FormLabel component="div" className="radio-check-group-title">
                  転送の有無
                </FormLabel>
                <div className="radio-check-group-content">
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="〇"
                        checked={isChecked(searchObj.transfer, "〇")}
                        onChange={changeCheckboxGroup("transfer")}
                      />
                    }
                    label="〇"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="ー"
                        checked={isChecked(searchObj.transfer, "ー")}
                        onChange={changeCheckboxGroup("transfer")}
                      />
                    }
                    label="ー"
                  />
                </div>
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <CtsInput
              label="発信元電話番号"
              value={searchObj.callerTel}
              onChange={changeInput("callerTel")}
            />
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <FormGroup className="radio-check-group">
                <FormLabel component="div" className="radio-check-group-title">
                  発信者
                </FormLabel>
                <div className="radio-check-group-content">
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="利用者"
                        checked={isChecked(searchObj.caller, "利用者")}
                        onChange={changeCheckboxGroup("caller")}
                      />
                    }
                    label="利用者"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="相手先"
                        checked={isChecked(searchObj.caller, "相手先")}
                        onChange={changeCheckboxGroup("caller")}
                      />
                    }
                    label="相手先"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="緊急通報"
                        checked={isChecked(searchObj.caller, "緊急通報")}
                        onChange={changeCheckboxGroup("caller")}
                      />
                    }
                    label="緊急通報"
                  />
                </div>
                <FormHelperText></FormHelperText>
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <CtsInput
              label="発信先電話番号"
              value={searchObj.destinationTel}
              onChange={changeInput("destinationTel")}
            />
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <FormGroup className="radio-check-group">
                <FormLabel component="div" className="radio-check-group-title">
                  発信先
                </FormLabel>
                <div className="radio-check-group-content">
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="相手先"
                        checked={isChecked(searchObj.destination, "相手先")}
                        onChange={changeCheckboxGroup("destination")}
                      />
                    }
                    label="相手先"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="利用者"
                        checked={isChecked(searchObj.destination, "利用者")}
                        onChange={changeCheckboxGroup("destination")}
                      />
                    }
                    label="利用者"
                  />
                  <FormControlLabel
                    control={
                      <CtsCheckbox
                        name="緊急通報"
                        checked={isChecked(searchObj.destination, "緊急通報")}
                        onChange={changeCheckboxGroup("destination")}
                      />
                    }
                    label="緊急通報"
                  />
                </div>
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </SearchPanel>

      <Box className="data-grid-container">
        <div className="pagination-row-mb">
          <CtsPagination pageopt={page} onChange={pageChange} />
        </div>
        <Box
          className="data-grid-min-height"
          style={{
            height: `calc(${
              pageHeight - searchPanelHeight
            }px - 24px - 24px - 16px)`,
          }}
        >
          <CtsDataGrid columns={columns} rows={data} />
        </Box>
      </Box>
    </div>
  );
}
