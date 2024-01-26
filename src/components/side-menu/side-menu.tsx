"use client";

import styles from "./side-menu.module.scss";
import { useEffect, useState } from "react";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import SideMenuIcon from "./side-menu-icon";
import { setSideMenuWidth, useDispatch } from "@/lib/redux";

const menuList = [
  {
    id: 1,
    menuName: "リアルタイム状況閲覧",
    icon: "LiveTvIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 11,
        menuName: "オペレータ",
        icon: "LiveTvOPIcon",
        routerUrl: "/xxxxxx11",
      },
      {
        id: 12,
        menuName: "自動音声認識(ASR)",
        icon: "LiveTvASRIcon",
        routerUrl: "/xxxxxx12",
      },
    ],
  },
  {
    id: 2,
    menuName: "通話履歴",
    icon: "HistoryIcon",
    routerUrl: "/xxxxxx2",
    isOpen: false,
  },
  {
    id: 3,
    menuName: "請求履歴",
    icon: "BillingHistoryIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 31,
        menuName: "利用者単位",
        icon: "BillingHistoryUserIcon",
        routerUrl: "/xxxxxx31",
      },
      {
        id: 32,
        menuName: "請求グループ単位",
        icon: "BillingHistoryGroupIcon",
        routerUrl: "/xxxxxx32",
      },
    ],
  },
  {
    id: 4,
    menuName: "スタッフ応対履歴",
    icon: "StaffResponseHistoryIcon",
    routerUrl: "/xxxxxx4",
    isOpen: false,
  },
  {
    id: 5,
    menuName: "メール送信履歴",
    icon: "EmailSendingHistoryIcon",
    routerUrl: "/xxxxxx5",
    isOpen: false,
  },
  {
    id: 6,
    menuName: "個人利用申請",
    icon: "PersonAddOutlinedIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 61,
        menuName: "申請中一覧",
        icon: "ApplicationPersonalUseCurrentlyIcon",
        routerUrl: "/xxxxxx61",
      },
      {
        id: 62,
        menuName: "処理済み一覧",
        icon: "FactCheckOutlinedIcon",
        routerUrl: "/xxxxxx62",
      },
      {
        id: 63,
        menuName: "発送準備用一覧",
        icon: "EmailOutlinedIcon",
        routerUrl: "/xxxxxx63",
      },
      {
        id: 64,
        menuName: "レポート",
        icon: "DescriptionOutlinedIcon",
        routerUrl: "/xxxxxx64",
      },
    ],
  },
  {
    id: 7,
    menuName: "法人・地域利用申請",
    icon: "LocationCityIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 71,
        menuName: "申請中一覧",
        icon: "ApplicationCorporateRegionalUseCurrentlyIcon",
        routerUrl: "/xxxxxx71",
      },
      {
        id: 72,
        menuName: "処理済み一覧",
        icon: "FactCheckOutlinedIcon",
        routerUrl: "/xxxxxx72",
      },
      {
        id: 73,
        menuName: "発送準備用一覧",
        icon: "EmailOutlinedIcon",
        routerUrl: "/xxxxxx73",
      },
      {
        id: 74,
        menuName: "レポート",
        icon: "DescriptionOutlinedIcon",
        routerUrl: "/xxxxxx74",
      },
    ],
  },
  {
    id: 8,
    menuName: "利用者管理",
    icon: "ManageAccountsOutlinedIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 81,
        menuName: "利用者一覧",
        icon: "PersonOutlineIcon",
        routerUrl: "/xxxxxx81",
      },
      {
        id: 82,
        menuName: "法人・地域一覧",
        icon: "LocationCityIcon",
        routerUrl: "/xxxxxx82",
      },
      {
        id: 83,
        menuName: "レポート",
        icon: "DescriptionOutlinedIcon",
        routerUrl: "/xxxxxx83",
      },
    ],
  },
  {
    id: 9,
    menuName: "お知らせ管理",
    icon: "AnnouncementOutlinedIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 91,
        menuName: "個人",
        icon: "NoticeManagementPersonIcon",
        routerUrl: "/xxxxxx91",
      },
      {
        id: 92,
        menuName: "全体",
        icon: "NoticeManagementAllIcon",
        routerUrl: "/xxxxxx92",
      },
    ],
  },
  {
    id: 10,
    menuName: "オペレータ管理",
    icon: "SupportAgentIcon",
    routerUrl: "/xxxxxx10",
    isOpen: false,
  },
  {
    id: 11,
    menuName: "オペレータ定型文管理",
    icon: "ForumOutlinedIcon",
    routerUrl: "/xxxxxx11",
    isOpen: false,
  },
  {
    id: 12,
    menuName: "ペア管理",
    icon: "PeopleAltOutlinedIcon",
    routerUrl: "/xxxxxx12",
    isOpen: false,
  },
  {
    id: 13,
    menuName: "スタッフ管理",
    icon: "BadgeOutlinedIcon",
    routerUrl: "/xxxxxx13",
    isOpen: false,
  },
  {
    id: 14,
    menuName: "事業者管理",
    icon: "AssignmentIndOutlinedIcon",
    routerUrl: "/xxxxxx14",
    isOpen: false,
  },
  {
    id: 15,
    menuName: "管理者管理",
    icon: "SupervisedUserCircleOutlinedIcon",
    routerUrl: "/xxxxxx15",
    isOpen: false,
  },
  {
    id: 16,
    menuName: "勤務管理",
    icon: "WorkIcon",
    routerUrl: "/xxxxxx16",
    isOpen: false,
  },
  {
    id: 17,
    menuName: "評価管理",
    icon: "ThumbUpOffAltOutlinedIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 171,
        menuName: "オペレータ",
        icon: "EvaluationManagementOPIcon",
        routerUrl: "/xxxxxx171",
      },
      {
        id: 172,
        menuName: "自動音声認識(ASR)",
        icon: "EvaluationManagementASRIcon",
        routerUrl: "/xxxxxx172",
      },
    ],
  },
  {
    id: 18,
    menuName: "研修管理",
    icon: "SchoolOutlinedIcon",
    routerUrl: "/xxxxxx14",
    isOpen: false,
  },
  {
    id: 19,
    menuName: "月次レポート",
    icon: "DescriptionOutlinedIcon",
    routerUrl: "/xxxxxx14",
    isOpen: false,
  },
  {
    id: 20,
    menuName: "ヘルプ管理",
    icon: "LiveHelpOutlinedIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 201,
        menuName: "ヘルプ",
        icon: "HelpCenterOutlinedIcon",
        routerUrl: "/xxxxxx201",
      },
      {
        id: 202,
        menuName: "ヘルプカテゴリ",
        icon: "QuizOutlinedIcon",
        routerUrl: "/xxxxxx202",
      },
    ],
  },
  {
    id: 21,
    menuName: "マニュアル管理",
    icon: "MenuBookIcon",
    routerUrl: "",
    isOpen: false,
    children: [
      {
        id: 211,
        menuName: "利用者",
        icon: "ManualManagementRIcon",
        routerUrl: "/xxxxxx211",
      },
      {
        id: 212,
        menuName: "法人・地域管理者",
        icon: "ManualManagementHIcon",
        routerUrl: "/xxxxxx212",
      },
      {
        id: 213,
        menuName: "オペレータ",
        icon: "ManualManagementOIcon",
        routerUrl: "/xxxxxx213",
      },
      {
        id: 214,
        menuName: "スタッフ",
        icon: "ManualManagementSIcon",
        routerUrl: "/xxxxxx214",
      },
      {
        id: 215,
        menuName: "管理者",
        icon: "ManualManagementKIcon",
        routerUrl: "/xxxxxx215",
      },
      {
        id: 216,
        menuName: "マニュアルカテゴリ",
        icon: "CategoryOutlinedIcon",
        routerUrl: "/xxxxxx216",
      },
    ],
  },
  {
    id: 22,
    menuName: "電話番号管理",
    icon: "DialpadIcon",
    routerUrl: "/xxxxxx14",
    isOpen: false,
  },
];
const drawerOpenWidth = 240;
const drawerCloseWidth = 60;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerOpenWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sideMenuPaperStyle: CSSObject = {
  top: "48px",
  width: drawerOpenWidth,
  height: "calc(100vh - 48px)",
  overflowX: "hidden",
  overflowY: "hidden",
  borderColor: "#8D97A6",
  backgroundColor: "#CFD8E6",
};

const openedMixin = (theme: Theme): CSSObject => ({
  ...sideMenuPaperStyle,
  width: drawerOpenWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...sideMenuPaperStyle,
  width: drawerCloseWidth + 1,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

export default function SideMenu() {
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [sideMenuList, setSideMenuList] = useState(menuList);
  const dispatch = useDispatch();

  /**
   * サイドメニュー展開
   */
  const openSideMenu = () => {
    setSideMenuOpen(true);
    dispatch(setSideMenuWidth(drawerOpenWidth));
  };

  /**
   * サイドメニュー閉じる
   */
  const closeSideMenu = () => {
    setSideMenuOpen(false);
    dispatch(setSideMenuWidth(drawerCloseWidth));
  };

  /**
   * メニュー選択
   * @param menuInfo
   */
  const clickMenu = (menuInfo: any) => {
    if (menuInfo.routerUrl && menuInfo.routerUrl != "" && !menuInfo.children) {
      alert(menuInfo.menuName + "画面遷移");
    } else {
      setSideMenuList(
        sideMenuList.map((menu) => {
          if (menu.id === menuInfo.id) {
            return {
              ...menu,
              ...{
                isOpen: !menu.isOpen,
              },
            };
          } else {
            return {
              ...menu,
              ...{
                isOpen: false,
              },
            };
          }
        })
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <Drawer
      variant="permanent"
      open={sideMenuOpen}
      className={styles.sideMenuContainer}
    >
      {/* 展開・閉じるボタン */}
      <div
        className={styles.drawerHeader}
        style={{ justifyContent: sideMenuOpen ? "flex-end" : "center" }}
      >
        {sideMenuOpen ? (
          <IconButton onClick={closeSideMenu}>
            <SvgIcon component={ArrowBackIcon}></SvgIcon>
          </IconButton>
        ) : (
          <IconButton onClick={openSideMenu}>
            <SvgIcon component={ArrowForwardIcon}></SvgIcon>
          </IconButton>
        )}
      </div>
      {/* メニュー */}
      <div className={styles.sideMenuList}>
        <List disablePadding>
          {sideMenuList.map((sideMenu) => (
            <div key={sideMenu.id}>
              <Tooltip
                placement="right-start"
                title={sideMenuOpen ? "" : sideMenu.menuName}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [-5, -25],
                        },
                      },
                    ],
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    pr: 2,
                    height: 44,
                    justifyContent: sideMenuOpen ? "initial" : "center",
                    pl: sideMenu.isOpen ? 1.5 : 2,
                    borderLeft: sideMenu.isOpen ? "4px solid #8D97A6" : 0,
                  }}
                  onClick={() => clickMenu(sideMenu)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sideMenuOpen ? 1 : "auto",
                      justifyContent: "center",
                      color: "#000000",
                    }}
                  >
                    <SideMenuIcon iconName={sideMenu.icon}></SideMenuIcon>
                  </ListItemIcon>
                  <ListItemText
                    className={styles.sideMenuListItemText}
                    primary={sideMenu.menuName}
                    sx={{ opacity: sideMenuOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
              {/* サブメニュー */}
              {sideMenu.children &&
                sideMenu.children.length &&
                sideMenu.children.length > 0 && (
                  <Collapse unmountOnExit timeout="auto" in={sideMenu.isOpen}>
                    <List component="div" disablePadding>
                      {sideMenu.children.map((child) => (
                        <Tooltip
                          key={child.id}
                          placement="right-start"
                          title={sideMenuOpen ? "" : child.menuName}
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [-5, -25],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <ListItemButton
                            sx={{
                              height: 44,
                              pl: sideMenuOpen ? 6 : 2,
                              pr: 2,
                              borderLeft: "4px solid #8D97A6",
                              justifyContent: sideMenuOpen
                                ? "initial"
                                : "center",
                            }}
                            onClick={() => clickMenu(child)}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: sideMenuOpen ? 1 : "auto",
                                justifyContent: "center",
                                color: "#000000",
                              }}
                            >
                              <SideMenuIcon
                                iconName={child.icon}
                              ></SideMenuIcon>
                            </ListItemIcon>
                            <ListItemText
                              className={styles.sideMenuListItemText}
                              primary={child.menuName}
                              sx={{ opacity: sideMenuOpen ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                )}
            </div>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
