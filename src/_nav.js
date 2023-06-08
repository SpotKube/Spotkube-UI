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
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  // {
  //   component: CNavTitle,
  //   name: "API",
  //
  // },
  {
    component: CNavGroup,
    name: "APIs",
    to: "/",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Full flow",
        to: "/swagger/full-flow",
      },
      {
        component: CNavItem,
        name: "Optimization Engine",
        to: "/swagger/optimization-engine",
      },
      {
        component: CNavItem,
        name: "Node Allocator",
        to: "/swagger/node-allocator",
      },
      {
        component: CNavItem,
        name: "Helm service",
        to: "/swagger/helm-service",
      },
    ],
  },
];

export default _nav;
