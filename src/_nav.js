import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilPuzzle,
  cilPeople,
  cilFolderOpen,
  cilRoom, 
  cilMediaPause,
  cilWc,
  cilSettings
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavTitle,
    name: "User Accounts",
    accounttype: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    component: CNavGroup,
    name: "Admin Accounts",
    to: "/",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    accounttype: ["ADMIN", "SUPER_ADMIN"],
    items: [
      {
        component: CNavItem,
        name: "Add Admin",
        to: "/admin/admin/add",
        accounttype: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        component: CNavItem,
        name: "Admin List",
        to: "/admin/admin/all",
        accounttype: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Designer Accounts",
    to: "/",
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    accounttype: ["ADMIN", "SUPER_ADMIN"],
    items: [
      {
        component: CNavItem,
        name: "Add Designer",
        to: "/admin/designer/add",
        accounttype: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        component: CNavItem,
        name: "Designer List",
        to: "/admin/designer/all",
        accounttype: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    component: CNavTitle,
    name: "Survey",
  },
  {
    component: CNavItem,
    name: "Active Surveys",
    to: "/admin/survey/active",
    accounttype: ["ADMIN", "SUPER_ADMIN"],
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Suspended Surveys",
    to: "/admin/survey/suspended",
    accounttype: ["ADMIN", "SUPER_ADMIN"],
    icon: <CIcon icon={cilMediaPause} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Archived Surveys",
    to: "/admin/survey/archived",
    accounttype: ["ADMIN", "SUPER_ADMIN"],
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Create Survey",
    to: "/designer/addsurvey",
    accounttype: ["DESIGNER"],
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Active Surveys",
    to: "/designer/survey/active",
    accounttype: ["DESIGNER"],
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Suspended Surveys",
    to: "/designer/survey/suspended",
    accounttype: ["DESIGNER"],
    icon: <CIcon icon={cilMediaPause} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Archived Surveys",
    to: "/designer/survey/archived",
    accounttype: ["DESIGNER"],
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Backups",
    accounttype: ["SUPER_ADMIN"],
  },
  {
    component: CNavItem,
    name: "Backups",
    to: "/admin/backups",
    accounttype: ["SUPER_ADMIN"],
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
];

export default _nav;
