"use client";

import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  DataGridPropsWithDefaultValues,
  DataGridPropsWithComplexDefaultValueBeforeProcessing,
  DataGridPropsWithoutDefaultValue,
} from "@mui/x-data-grid/internals";
import { DataGridForcedPropsKey } from "@mui/x-data-grid/models/props/DataGridProps";
import { JSX, RefAttributes } from "react";

const StyledDataGrid = styled(DataGrid)((options) => {
  const theme: any = options.theme;
  return {
    "&.MuiDataGrid-root": {
      border: "unset",
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "2px solid rgba(0, 0, 0, 0.2) !important",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      color: "#687284",
    },
    "& .MuiDataGrid-columnHeader:focus": {
      outline: "unset !important",
    },
    "& .MuiDataGrid-columnHeader:focus-within": {
      outline: "unset !important",
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "hidden !important",
    },
  };
});

function CustomNoRowsOverlay() {
  return <></>;
}

export default function CtsDataGrid(
  props: JSX.IntrinsicAttributes &
    Omit<
      Partial<DataGridPropsWithDefaultValues> &
        DataGridPropsWithComplexDefaultValueBeforeProcessing &
        DataGridPropsWithoutDefaultValue<any>,
      DataGridForcedPropsKey
    > & { pagination?: true | undefined } & RefAttributes<HTMLDivElement>
) {
  return (
    <>
      {props.rows && props.rows.length > 0 ? (
        <StyledDataGrid
          hideFooter
          disableColumnMenu
          columnHeaderHeight={44}
          rowHeight={44}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          {...props}
        />
      ) : (
        <>
          <div className="data-grid-none-data">検索データがありません</div>
        </>
      )}
    </>
  );
}
