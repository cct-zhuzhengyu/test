"use client";

import axios from "axios";
import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Pagination,
} from "@mui/material";
import SearchPanel from "@/components/search-panel/search-panel";
import CtsInput from "@/components/cts-input/cts-input";
import CtsCheckbox from "@/components/cts-checkbox/cts-checkbox";
import { useImmer } from "use-immer";
import { GridColDef } from "@mui/x-data-grid";
import CtsDataGrid from "@/components/cts-data-grid/cts-data-grid";
import CtsPagination, {
  PageOpt,
} from "@/components/cts-pagination/cts-pagination";
import CtsSetPlus from "@/components/cts-set-plus/cts-set-plus";
import {
  selectClientSize,
  selectPageHeight,
  setPageInfo,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import CtsGroup from "@/components/cts-group/cts-group";

const seachObjInit = {
  start: "",
  end: "",
  telStatus: [],
  literalMethod: [],
  business: "",
  operatorId: "",
  transfer: ["", "", ""],
  callerTel: "",
  caller: [],
  destinationTel: "",
  destination: [],
};

export default function ComponentSample() {
  const dispatch = useDispatch();
  const pageHeight = useSelector(selectPageHeight);
  const { searchPanelHeight } = useSelector(selectClientSize);

  const [data, setData] = useImmer([]);
  const [searchObj, setSearchObj] = useImmer(seachObjInit);

  useEffect(() => {
    dispatch(
      setPageInfo({
        title: "通話履歴一覧",
      })
    );
  }, [dispatch]);

  /**
   * 検索
   */
  const clickSearch = () => {
    console.log("検索条件");
    console.log(searchObj);
  };

  /**
   * 検索条件クリア
   */
  const clickClear = () => {
    setSearchObj(seachObjInit);
  };

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

  return (
    <div className="layout-container">
      <SearchPanel clickSearch={clickSearch} clickClear={clickClear}>
        <Grid container rowSpacing={"24px"} columnSpacing={"16px"}>
          <Grid item xs={3}>
            <CtsInput
              label="オペレータID"
              value={searchObj.operatorId}
              onChange={changeInput("operatorId")}
              validation={{
                required: true,
                maxLength: 10,
                minLength: 2,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormGroup className="checkbox-group">
                <FormLabel component="div" className="checkbox-group-title">
                  通話ステータス
                </FormLabel>
                <div className="checkbox-group-content">
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
              <FormGroup className="checkbox-group">
                <FormLabel component="div" className="checkbox-group-title">
                  文字化方法
                </FormLabel>
                <div className="checkbox-group-content">
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
          <Grid item xs={3}></Grid>
          <CtsGroup value={searchObj.transfer}>
            <CtsSetPlus
              config={{
                label: "事業者",
                placeholder: "事業者名または事業者IDを入力してください",
                getOptFunc: getOptFunc4Business,
                selChgFunc: selChgFunc4Business,
              }}
            />
          </CtsGroup>
          <Grid item xs={3}>
            <CtsInput
              label="オペレータID"
              value={searchObj.operatorId}
              onChange={changeInput("operatorId")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormGroup className="checkbox-group">
                <FormLabel component="div" className="checkbox-group-title">
                  転送の有無
                </FormLabel>
                <div className="checkbox-group-content">
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
              <FormGroup className="checkbox-group">
                <FormLabel component="div" className="checkbox-group-title">
                  発信者
                </FormLabel>
                <div className="checkbox-group-content">
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
              <FormGroup className="checkbox-group">
                <FormLabel component="div" className="checkbox-group-title">
                  発信先
                </FormLabel>
                <div className="checkbox-group-content">
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
    </div>
  );
}
