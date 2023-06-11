import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilPuzzle,
  cilPeople,
  cilFolderOpen,
  cilRoom,
  cilMediaPause,
  cilWc,
  cilSettings,
  cilSend,
  cilSpreadsheet,
  cilDollar
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavTitle,
    name: "API",
  },
  {
    component: CNavItem,
    name: "End-to-End Flows",
    to: "/swagger/full-flow",
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Task-based APIs",
    to: "/swagger/partial-apis",
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Logs",
  },
  {
    component: CNavItem,
    name: "Logs",
    to: "/swagger/logs",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Pricing",
  },
  {
    component: CNavItem,
    name: "Spot Pricing",
    to: "/swagger/spot-pricing",
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
];

export default _nav;
