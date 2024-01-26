"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import SvgIcon from "@mui/material/SvgIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { selectClientSize, useSelector } from "@/lib/redux";

const menuList = [
  {
    menuId: 1,
    menuName: "お知らせ一覧",
    routerUrl: "/noticeList",
  },
  {
    menuId: 2,
    menuName: "登録情報変更",
    routerUrl: "/loginInformationChange",
  },
  {
    menuId: 3,
    menuName: "パスワード変更",
    routerUrl: "/passwordChange",
  },
];

export default function Header() {
  const { headerHeighht } = useSelector(selectClientSize);
  // ユーザー名
  const [userName, setUserName] = useState("");
  // お知らせの数
  const [messageNum, setMessageNum] = useState(0);
  // メニューの開閉
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);
  const clickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };
  // メニュー選択
  const clickMenu = (url: string) => {
    // TODO
    alert("画面URL:" + url);
  };
  // 「ログアウト」選択
  const clickLogout = () => {
    // TODO
    alert("ログアウトしました");
  };
  useEffect(() => {
    // お知らせの数を取得
    setMessageNum(3);
    // ユーザー名を取得
    setUserName("テスト 一郎様");
  }, []);

  return (
    <div
      className={styles.headerContainer}
      style={{ height: `${headerHeighht}px` }}
    >
      <div className={styles.logoContainer}>LOGO</div>
      <div className={styles.menuContainer}>
        <IconButton
          size="small"
          onClick={clickOpenMenu}
          sx={{ width: 28, height: 28 }}
        >
          <Badge
            color="primary"
            overlap="circular"
            variant="dot"
            invisible={messageNum > 0 ? false : true}
          >
            <SvgIcon
              component={MenuIcon}
              sx={{ color: "#FFFFFF", fontSize: 28 }}
            ></SvgIcon>
          </Badge>
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={closeMenu}
          className={styles.userMenuList}
        >
          <MenuItem sx={{ color: "#000000", opacity: 0.2, cursor: "default" }}>
            {userName}
          </MenuItem>
          <hr className={styles.menuItemDivider} />
          {menuList.map((menu) => (
            <MenuItem
              key={menu.menuId}
              onClick={() => clickMenu(menu.routerUrl)}
            >
              {menu.menuName}
              {menu.menuName === "お知らせ一覧" && (
                <div className={styles.messageNumberBadge}>{messageNum}</div>
              )}
            </MenuItem>
          ))}
          <hr className={styles.menuItemDivider} />
          <MenuItem onClick={clickLogout}>ログアウト</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
