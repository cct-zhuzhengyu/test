import { selectClientSize, useSelector } from "@/lib/redux";
import style from "./footer.module.scss";

export default function Footer() {
  const { footerHeight } = useSelector(selectClientSize);
  return (
    <div className={style.container} style={{ height: `${footerHeight}px` }}>
      <span className={style.title}>
        Copyright© 日本財団電話リレーサービス All Rights Reserved.{" "}
      </span>
    </div>
  );
}
