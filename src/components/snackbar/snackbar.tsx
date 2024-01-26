import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./snackbar.module.scss";

// const useStyles = makeStyles(() => ({
//   root: {
//     minWidth: "280px !important",
//     maxWidth: "280px !important",
//     backgroundColor: "#EEF2F6",
//   },
//   container: {
//     display: flex,
//   },
// }));

interface ReportCompleteProps extends CustomContentProps {
  allowDownload?: boolean;
}

const Snackbar = forwardRef<HTMLDivElement, ReportCompleteProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    const getIcon = () => {
      if (props.variant === "error") {
        return <ErrorIcon sx={{ color: "#CD2026" }} />;
      } else if (props.variant === "success") {
        return <CheckCircleIcon sx={{ color: "#1F7F34" }} />;
      } else if (props.variant === "info") {
        return <InfoIcon sx={{ color: "#162A58" }} />;
      } else {
        return <></>;
      }
    };

    return (
      <SnackbarContent ref={ref} className={styles.root}>
        <div className={styles.container}>
          <div className={styles.typeIcon}>{getIcon()}</div>
          <div className={styles.message}>{props.message}</div>
          <div className={styles.closeIcon}>
            <IconButton size="small" onClick={handleDismiss}>
              <CancelIcon fontSize="small" sx={{ color: "#687284" }} />
            </IconButton>
          </div>
        </div>
      </SnackbarContent>
    );
  }
);

Snackbar.displayName = "Snackbar";

export default Snackbar;
