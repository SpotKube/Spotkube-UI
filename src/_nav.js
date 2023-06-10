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
  cilSpreadsheet
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavTitle,
    name: "API",
  },
  {
    component: CNavItem,
    name: "Complete APIs",
    to: "/swagger/full-flow",
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Partial APIs",
    to: "/swagger/partial-apis",
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: "APIs",
  //   to: "/",
  //   icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Complete APIs",
  //       to: "/swagger/full-flow",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Partial APIs",
  //       to: "/swagger/partial-apis",
  //     },
  //   ],
  // },
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
];

export default _nav;
