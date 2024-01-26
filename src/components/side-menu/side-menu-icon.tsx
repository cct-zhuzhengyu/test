"use client";

import LiveTvIcon from "@mui/icons-material/LiveTv";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import WorkIcon from "@mui/icons-material/Work";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import DialpadIcon from "@mui/icons-material/Dialpad";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LiveTvOPIcon from "@/assets/icons/LiveTvOP.svg";
import LiveTvASRIcon from "@/assets/icons/LiveTvASR.svg";
import BillingHistoryIcon from "@/assets/icons/BillingHistory.svg";
import BillingHistoryUserIcon from "@/assets/icons/BillingHistoryUser.svg";
import BillingHistoryGroupIcon from "@/assets/icons/BillingHistoryGroup.svg";
import StaffResponseHistoryIcon from "@/assets/icons/StaffResponseHistory.svg";
import EmailSendingHistoryIcon from "@/assets/icons/EmailSendingHistory.svg";
import ApplicationPersonalUseCurrentlyIcon from "@/assets/icons/ApplicationPersonalUseCurrently.svg";
import ApplicationCorporateRegionalUseCurrentlyIcon from "@/assets/icons/ApplicationCorporateRegionalUseCurrently.svg";
import NoticeManagementPersonIcon from "@/assets/icons/NoticeManagementPerson.svg";
import NoticeManagementAllIcon from "@/assets/icons/NoticeManagementAll.svg";
import EvaluationManagementOPIcon from "@/assets/icons/EvaluationManagementOP.svg";
import EvaluationManagementASRIcon from "@/assets/icons/EvaluationManagementASR.svg";
import ManualManagementRIcon from "@/assets/icons/ManualManagementR.svg";
import ManualManagementHIcon from "@/assets/icons/ManualManagementH.svg";
import ManualManagementOIcon from "@/assets/icons/ManualManagementO.svg";
import ManualManagementSIcon from "@/assets/icons/ManualManagementS.svg";
import ManualManagementKIcon from "@/assets/icons/ManualManagementK.svg";
import CtsSvgIcon from "../cts-svg-icon/cts-svg-icon";

export default function SideMenuIcon(popros: { iconName: string }) {
  const { iconName } = popros;

  if (iconName === "LiveTvIcon") {
    return <CtsSvgIcon component={LiveTvIcon}></CtsSvgIcon>;
  } else if (iconName === "LiveTvOPIcon") {
    return <CtsSvgIcon component={LiveTvOPIcon}></CtsSvgIcon>;
  } else if (iconName === "LiveTvASRIcon") {
    return <CtsSvgIcon component={LiveTvASRIcon}></CtsSvgIcon>;
  } else if (iconName === "HistoryIcon") {
    return <CtsSvgIcon component={HistoryIcon}></CtsSvgIcon>;
  } else if (iconName === "BillingHistoryIcon") {
    return <CtsSvgIcon component={BillingHistoryIcon}></CtsSvgIcon>;
  } else if (iconName === "BillingHistoryUserIcon") {
    return <CtsSvgIcon component={BillingHistoryUserIcon}></CtsSvgIcon>;
  } else if (iconName === "BillingHistoryGroupIcon") {
    return <CtsSvgIcon component={BillingHistoryGroupIcon}></CtsSvgIcon>;
  } else if (iconName === "StaffResponseHistoryIcon") {
    return <CtsSvgIcon component={StaffResponseHistoryIcon}></CtsSvgIcon>;
  } else if (iconName === "EmailSendingHistoryIcon") {
    return <CtsSvgIcon component={EmailSendingHistoryIcon}></CtsSvgIcon>;
  } else if (iconName === "PersonAddOutlinedIcon") {
    return <CtsSvgIcon component={PersonAddOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "ApplicationPersonalUseCurrentlyIcon") {
    return (
      <CtsSvgIcon component={ApplicationPersonalUseCurrentlyIcon}></CtsSvgIcon>
    );
  } else if (iconName === "FactCheckOutlinedIcon") {
    return <CtsSvgIcon component={FactCheckOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "EmailOutlinedIcon") {
    return <CtsSvgIcon component={EmailOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "DescriptionOutlinedIcon") {
    return <CtsSvgIcon component={DescriptionOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "LocationCityIcon") {
    return <CtsSvgIcon component={LocationCityIcon}></CtsSvgIcon>;
  } else if (iconName === "ApplicationCorporateRegionalUseCurrentlyIcon") {
    return (
      <CtsSvgIcon
        component={ApplicationCorporateRegionalUseCurrentlyIcon}
      ></CtsSvgIcon>
    );
  } else if (iconName === "ManageAccountsOutlinedIcon") {
    return <CtsSvgIcon component={ManageAccountsOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "PersonOutlineIcon") {
    return <CtsSvgIcon component={PersonOutlineIcon}></CtsSvgIcon>;
  } else if (iconName === "AnnouncementOutlinedIcon") {
    return <CtsSvgIcon component={AnnouncementOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "NoticeManagementPersonIcon") {
    return <CtsSvgIcon component={NoticeManagementPersonIcon}></CtsSvgIcon>;
  } else if (iconName === "NoticeManagementAllIcon") {
    return <CtsSvgIcon component={NoticeManagementAllIcon}></CtsSvgIcon>;
  } else if (iconName === "SupportAgentIcon") {
    return <CtsSvgIcon component={SupportAgentIcon}></CtsSvgIcon>;
  } else if (iconName === "ForumOutlinedIcon") {
    return <CtsSvgIcon component={ForumOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "PeopleAltOutlinedIcon") {
    return <CtsSvgIcon component={PeopleAltOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "BadgeOutlinedIcon") {
    return <CtsSvgIcon component={BadgeOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "AssignmentIndOutlinedIcon") {
    return <CtsSvgIcon component={AssignmentIndOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "SupervisedUserCircleOutlinedIcon") {
    return (
      <CtsSvgIcon component={SupervisedUserCircleOutlinedIcon}></CtsSvgIcon>
    );
  } else if (iconName === "WorkIcon") {
    return <CtsSvgIcon component={WorkIcon}></CtsSvgIcon>;
  } else if (iconName === "ThumbUpOffAltOutlinedIcon") {
    return <CtsSvgIcon component={ThumbUpOffAltOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "EvaluationManagementOPIcon") {
    return <CtsSvgIcon component={EvaluationManagementOPIcon}></CtsSvgIcon>;
  } else if (iconName === "EvaluationManagementASRIcon") {
    return <CtsSvgIcon component={EvaluationManagementASRIcon}></CtsSvgIcon>;
  } else if (iconName === "SchoolOutlinedIcon") {
    return <CtsSvgIcon component={SchoolOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "LiveHelpOutlinedIcon") {
    return <CtsSvgIcon component={LiveHelpOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "HelpCenterOutlinedIcon") {
    return <CtsSvgIcon component={HelpCenterOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "QuizOutlinedIcon") {
    return <CtsSvgIcon component={QuizOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "MenuBookIcon") {
    return <CtsSvgIcon component={MenuBookIcon}></CtsSvgIcon>;
  } else if (iconName === "ManualManagementRIcon") {
    return <CtsSvgIcon component={ManualManagementRIcon}></CtsSvgIcon>;
  } else if (iconName === "ManualManagementHIcon") {
    return <CtsSvgIcon component={ManualManagementHIcon}></CtsSvgIcon>;
  } else if (iconName === "ManualManagementOIcon") {
    return <CtsSvgIcon component={ManualManagementOIcon}></CtsSvgIcon>;
  } else if (iconName === "ManualManagementSIcon") {
    return <CtsSvgIcon component={ManualManagementSIcon}></CtsSvgIcon>;
  } else if (iconName === "ManualManagementKIcon") {
    return <CtsSvgIcon component={ManualManagementKIcon}></CtsSvgIcon>;
  } else if (iconName === "CategoryOutlinedIcon") {
    return <CtsSvgIcon component={CategoryOutlinedIcon}></CtsSvgIcon>;
  } else if (iconName === "DialpadIcon") {
    return <CtsSvgIcon component={DialpadIcon}></CtsSvgIcon>;
  } else {
    return <></>;
  }
}
