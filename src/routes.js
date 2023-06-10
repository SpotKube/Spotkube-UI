import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "./views/dashboard/Dashboard";
import FullFlow from "./views/swagger/FullFlow";
import PartialAPIs from "./views/swagger/PartialAPIs";
import Logs from "./views/logs/LogFiles";

const routes = [
  {
    path: "/swagger",
    exact: true,
    name: "Panel",
    component: FullFlow,
    isLoggedIn: false,
  },

  {
    path: "/swagger/full-flow",
    name: "Complete Flow",
    exact: true,
    isLoggedIn: false,
    component: FullFlow,
  },
  {
    path: "/swagger/partial-apis",
    name: "Partial APIs",
    exact: true,
    isLoggedIn: false,
    component: PartialAPIs,
  },
  {
    path: "/swagger/logs",
    name: "Logs",
    exact: true,
    isLoggedIn: false,
    component: Logs,
  },
];
export default routes;
