import Dashboard from "./views/dashboard/Dashboard";
import AddSurveyPage from "./views/survey/AddSurvey";
import ViewSurveyPage from "./views/viewSurvey/viewSurvey";
import AddUserAccountPage from "./views/account/AddUserAccountPage";
import UserAccountListPage from "./views/account/UserAccountListPage";
import UserAccountPage from "./views/account/UserAccountPage";
import ProfilePage from "./views/profile/ProfilePage";
import SurveyListPage from "./views/survey/SurveyList";
import BackupListPage from "./views/backups/BackupListPage";

/**
 * Login - /login
 * Admin
 * /admin
 *      Designer user
 *      /admin/designer/add
 *      /admin/designer/all
 *      /admin/designer/view
 *
 * /Designer
 *  /designer
 *
 *
 */

const routes = [
  {
    path: "/admin",
    exact: true,
    name: "Admin Panel",
    component: Dashboard,
    isLoggedIn: false,
  },

  {
    path: "/admin/admin/add",
    name: "Add Admin",
    exact: true,
    isLoggedIn: false,
    component: AddUserAccountPage,
  },
  {
    path: "/admin/admin/all",
    name: "Admin User List",
    exact: true,
    isLoggedIn: false,
    component: UserAccountListPage,
  },
  {
    path: "/admin/admin/view",
    name: "Admin User",
    exact: true,
    isLoggedIn: false,
    component: UserAccountPage,
  },
  {
    path: "/admin/designer",
    name: "Designer User Accounts",
    exact: true,
    isLoggedIn: false,
    component: AddUserAccountPage,
  },
  {
    path: "/admin/designer/add",
    name: "Add Designer",
    exact: true,
    isLoggedIn: false,
    component: AddUserAccountPage,
  },
  {
    path: "/admin/designer/all",
    name: "Designer List",
    exact: true,
    isLoggedIn: false,
    component: UserAccountListPage,
  },

  {
    path: "/admin/designer/view",
    name: "Designer User",
    exact: true,
    isLoggedIn: false,
    component: UserAccountPage,
  },
  {
    path: "/admin/survey",
    name: "Survey",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/admin/survey/active",
    name: "Active Survey List",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/admin/survey/suspended",
    name: "Suspended Survey List",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/admin/survey/archived",
    name: "Survey List",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/designer",
    name: "Designer",
    exact: true,
    isLoggedIn: false,
    component: Dashboard,
  },
  {
    path: "/designer/addsurvey",
    name: "Add survey",
    exact: true,
    isLoggedIn: false,
    component: AddSurveyPage,
  },
  {
    path: "/designer/viewsurvey/:id",
    name: "View survey",
    exact: true,
    isLoggedIn: false,
    component: ViewSurveyPage,
  },
  {
    path: "/designer/survey",
    name: "Survey",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/designer/survey/active",
    name: "Active Survey List",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/designer/survey/suspended",
    name: "Suspended Survey List",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/designer/survey/archived",
    name: "Survey List",
    exact: true,
    isLoggedIn: false,
    component: SurveyListPage,
  },
  {
    path: "/user",
    name: "Profile",
    exact: true,
    isLoggedIn: false,
    component: ProfilePage,
  },

  {
    path: "/user/profile",
    name: "Profile",
    exact: true,
    isLoggedIn: false,
    component: ProfilePage,
  },
  {
    path: "/admin/backups",
    name: "Backups",
    exact: true,
    isLoggedIn: false,
    component: BackupListPage,
  },
];
export default routes;
