import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "./views/dashboard/Dashboard";
import FullFlow from "./views/swagger/FullFlow";
import NodeAllocator from "./views/swagger/PartialAPIs";

const routes = [
  {
    path: "/swagger",
    exact: true,
    name: "Swagger Panel",
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
    component: () => Redirect("www.google.com"),
  },
];
export default routes;
