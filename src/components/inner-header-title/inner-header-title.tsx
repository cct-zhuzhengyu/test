import style from "./inner-header-title.module.scss";
import CtsSvgIcon from "../cts-svg-icon/cts-svg-icon";
import { selectPageInfo, selectClientSize, useSelector } from "@/lib/redux";
import { Subject } from "@mui/icons-material";

export default function InnerHeaderTitle() {
  const title = useSelector(selectPageInfo).title;
  const { innerHeaderHeight } = useSelector(selectClientSize);
  return (
    <div
      className={style.container}
      style={{ height: `${innerHeaderHeight}px` }}
    >
      <CtsSvgIcon component={Subject}></CtsSvgIcon>
      <span className={style.title}>{title}</span>
    </div>
  );
}
