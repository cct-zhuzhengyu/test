import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton, Pagination, PaginationProps } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import { JSX } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export interface PageOpt {
  page: number;
  perPage: number;
  totalPage: number;
  totalCount: number;
}

const StyledPagination = styled(Pagination)(() => {
  return {
    "&": {
      height: "24px",
    },
    "& li": {
      height: "24px",
      "& button": {
        marginTop: "-4px",
      },
    },
    "& li:first-of-type": {
      "& button": {
        padding: "0 5px 0 0 ",
      },
    },
    "& li:last-of-type": {
      "& button": {
        padding: "0 0 0 6px",
      },
    },
    "& .MuiPaginationItem-page": {
      minWidth: "24px",
      width: "24px",
      height: "24px",
    },
    "& .MuiPaginationItem-page:hover": {
      color: "#FFFFFF",
      backgroundColor: "#8D97A6 !important",
    },
    "& .MuiPaginationItem-previousNext": {
      minWidth: "55px",
      width: "55px",
      height: "24px",
      padding: "0",
      ".MuiSvgIcon-root": {
        fontSize: "18px",
      },
    },
    "& .Mui-selected": {
      color: "#FFFFFF",
      backgroundColor: "#8D97A6 !important",
    },
  };
});

export default function CtsPagination(
  props: JSX.IntrinsicAttributes &
    PaginationProps & { theme?: Theme | undefined } & { pageopt: PageOpt }
) {
  const { page, perPage, totalPage, totalCount } = props.pageopt;

  const maxCount = () => {
    const max = page * perPage;
    return max > totalCount ? totalCount : max;
  };

  return (
    <div style={{ display: "flex" }}>
      {totalCount > 0 && (
        <>
          <span style={{ marginRight: "16px" }}>
            {`全 ${totalCount}件中 ${
              (page - 1) * perPage + 1
            } 件 〜 ${maxCount()} 件を表示`}
          </span>
          <StyledPagination
            variant="outlined"
            count={totalPage}
            page={page}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: () => {
                    return (
                      <>
                        <NavigateBeforeIcon />
                        前へ
                      </>
                    );
                  },
                  next: () => {
                    return (
                      <>
                        次へ
                        <NavigateNextIcon />
                      </>
                    );
                  },
                }}
                {...item}
              />
            )}
            {...props}
          />
        </>
      )}
    </div>
  );
}
