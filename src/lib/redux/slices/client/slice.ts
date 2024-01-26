import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ClientSizeState {
  clientWidth: number;
  clientHeight: number;
  headerHeighht: number;
  footerHeight: number;
  sideMenuWidth: number;
  innerHeaderHeight: number;
  layoutContainerPadding: number;
  layoutContainerMinWidth: number;
  searchPanelHeight: number;
}

export interface PageInfo {
  title: string;
}

export interface ClientState {
  clientSize: ClientSizeState;
  pageInfo: PageInfo;
  loading: boolean;
}

const initialState: ClientState = {
  clientSize: {
    clientWidth: 1920,
    clientHeight: 1080,
    headerHeighht: 48,
    footerHeight: 44,
    sideMenuWidth: 240,
    innerHeaderHeight: 60,
    layoutContainerPadding: 48,
    layoutContainerMinWidth: 1200,
    searchPanelHeight: 0,
  },
  pageInfo: {
    title: "",
  },
  loading: false,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setWindowSize: (
      state,
      action: PayloadAction<{ clientWidth: number; clientHeight: number }>
    ) => {
      state.clientSize = {
        ...state.clientSize,
        ...action.payload,
      };
    },
    setSideMenuWidth: (state, action: PayloadAction<number>) => {
      state.clientSize.sideMenuWidth = action.payload;
    },
    setSearchPanelHeight: (state, action: PayloadAction<number>) => {
      state.clientSize.searchPanelHeight = action.payload;
    },
    setPageInfo: (state, action: PayloadAction<PageInfo>) => {
      state.pageInfo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setWindowSize,
  setSideMenuWidth,
  setSearchPanelHeight,
  setPageInfo,
  setLoading,
} = clientSlice.actions;
