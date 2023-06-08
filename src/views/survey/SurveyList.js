import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api, { registerAccessToken } from "../../api";
import { accessToken } from "../../store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Components
import { LoadingIndicator } from "../../components";
const ProjectTable = React.lazy(() => import("./Table"));
const ProjectTableBody = React.lazy(() => import("./TableBody"));

const ProjectListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentLocation = useLocation().pathname;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [data, setData] = useState([]);
  const [accountsType, setAccountsType] = useState("");

  /*
   * Fetch User Accounts
   */
  useEffect(() => {
    const accountType = currentLocation.split("/")[1];
    let queries;
    const sts = currentLocation.split("/")[3];
    switch (sts) {
      case "active":
        queries = { surveyStatus: "ACTIVE",  isArchived: false};
        break;
      case "suspended":
        queries = { surveyStatus: "SUSPENDED" };
        break;
      default:
        queries = {};
        break;
    }

    // eslint-disable-next-line no-unused-expressions
    currentLocation.split("/")[3] === "archived"
      ? (queries = { isArchived: true})
      : queries;

    setInitialLoading(true);
    const fetchData = async () => {
      if (!registerAccessToken(accessToken(), history, dispatch)) return;
      const [res, data] = await api.survey.viewAll(queries);
      if (res.status === 200) {
        setData(data);
      } else {
        toast.error(
          res.message
            ? res.message
            : "Error Occurred, Sorry for the inconvenience"
        );
      }
      setInitialLoading(false);
    };
    fetchData().catch((err) => {
      setInitialLoading(false);
    });
    setAccountsType(accountType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle pagination
  const maxPages = 1;
  const [pageNumber, setPageNumber] = useState(1);

  const tableHeaderCells = ["Title", "Survey ID", "username", "status", ""];

  // Handle Suspend/Activate button.
  const handleSuspend = async (surveyId, status) => {
    setLoading(true);
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    let _status;
    switch (status) {
      case "ACTIVE":
        _status = "SUSPENDED";
        break;
      case "SUSPENDED":
        _status = "ACTIVE";
        break;
      default:
        _status = "SUSPENDED";
        break;
    }
    // eslint-disable-next-line no-unused-vars
    const [res, d] = await api.survey.suspendSurvey(surveyId, _status);
    if (res.status === 200) {
      toast.success(res.message ? res.message : "Successfully Updated");

      const newData = data?.filter((item) => {
        if (item.surveyId === surveyId) {
          item.surveyStatus = _status;
          if (currentLocation.split("/")[3] !== "archived") {
            return false;
          } else {
            return true;
          }
        } else {
          return item;
        }
      });
      setData(newData);
    } else {
      toast.error(
        res.message ? res.message : "Error occurred. Please try again later."
      );
    }
    setLoading(false);
  };

  // Handle Archive/ Unarchive button.
  const handleArchive = async (surveyId, isArchived) => {
    setLoading(true);
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    // eslint-disable-next-line no-unused-vars
    const [res, d] = await api.survey.archiveSurvey(surveyId, !isArchived);
    if (res.status === 200) {
      toast.success(res.message ? res.message : "Successfully Updated");
      const newData = data?.filter((item) => {
        if (item.surveyId === surveyId) {
          item.isArchived = !isArchived;
          if (currentLocation.split("/")[3] !== "suspended") {
            return false;
          } else {
            return true;
          }
        } else {
          return item;
        }
      });
      setData(newData || []);
    } else {
      toast.error(
        res.message ? res.message : "Error occurred. Please try again later."
      );
    }
    setLoading(false);
  };

  /// Handle delete survey
  const handleDeleteSurvey = async (surveyId) => {
    setLoading(true);
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    // eslint-disable-next-line no-unused-vars
    const [res, d] = await api.survey.deleteSurvey(surveyId);
    if (res.status === 200) {
      toast.success(res.message ? res.message : "Successfully deleted.");

      const newData = data?.filter((item) => {
        if (item.surveyId !== surveyId) {
          return item;
        } else {
          return false;
        }
      });
      setData(newData || []);
    } else {
      toast.error(
        res.message ? res.message : "Error occurred. Please try again later."
      );
    }
    setLoading(false);
  };

  return (
    <>
      {initialLoading ? (
        <div className="flex justify-center"> {LoadingIndicator("lg")} </div>
      ) : (
        <div>
          <ProjectTable
            data={data}
            maxPages={maxPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            tableHeaderCells={tableHeaderCells}
            accountsType={accountsType}
            loading={loading}
          >
            <ProjectTableBody
              data={data}
              suspendSurvey={handleSuspend}
              archiveSurvey={handleArchive}
              deleteSurvey={handleDeleteSurvey}
              loading={loading}
              accountType={accountsType}
            />
          </ProjectTable>
        </div>
      )}
    </>
  );
};

export default ProjectListPage;

// const sampleData = [
//   {
//     surveyID: "SURVEY_1",
//     username: "Darshana",
//     title: "Mapping survey",
//     startDate: "2021-05-01",
//     endDate: "2021-05-31",
//     status: "ACTIVE",
//   },
//   {
//     surveyID: "SURVEY_2",
//     username: "Darshana",
//     title: "Mapping survey",
//     startDate: "2021-05-01",
//     endDate: "2021-05-31",
//     status: "ACTIVE",
//   },
// ];
