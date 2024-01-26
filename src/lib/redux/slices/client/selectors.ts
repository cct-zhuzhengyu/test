import type { ReduxState } from "@/lib/redux";

export const selectClientSize = (state: ReduxState) => state.client.clientSize;

export const selectPageInfo = (state: ReduxState) => state.client.pageInfo;

export const selectPageHeight = (state: ReduxState) => {
  const {
    clientWidth,
    clientHeight,
    headerHeighht,
    footerHeight,
    sideMenuWidth,
    layoutContainerMinWidth,
    layoutContainerPadding,
    innerHeaderHeight,
  } = state.client.clientSize;
  let pageHeight =
    clientHeight -
    headerHeighht -
    footerHeight -
    innerHeaderHeight -
    layoutContainerPadding;
  if (clientWidth - sideMenuWidth < layoutContainerMinWidth) {
    pageHeight = pageHeight - 10;
  }
  return pageHeight;
};

export const selectLoading = (state: ReduxState) => state.client.loading;
