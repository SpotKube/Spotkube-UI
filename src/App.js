import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "./scss/style.scss";
import { thunks } from "./store";

// Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loading = (
  <div className="pt-3 text-center bg-slate-50">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const ErrorPage = React.lazy(() => import("./views/pages/errorPage"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check access token
    dispatch(thunks.user.checkToken());
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            path="/"
            name="Admin Page"
            render={(props) => <DefaultLayout {...props} />}
          />
          <Route
            path="/404page"
            name="Error Page"
            render={(props) => <ErrorPage {...props} />}
          />
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
