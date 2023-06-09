import Dashboard from "./views/dashboard/Dashboard";
import FullFlow from "./views/swagger/FullFlow";


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
    name: "Full Flow",
    exact: true,
    isLoggedIn: false,
    component: FullFlow,
  },
  
];
export default routes;
