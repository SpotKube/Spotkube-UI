import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { CButton, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
import { convertTZ } from "../../utils/functions";
import { CustomModal, ExportExcel } from "../../components";
import { toast } from "react-toastify";

import api, { registerAccessToken } from "../../api";
import { accessToken } from "../../store";
const parse = require("html-react-parser");

const TableBody = ({
  data,
  suspendSurvey,
  archiveSurvey,
  loading,
  accountType,
  deleteSurvey,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const baseURL = process.env.REACT_APP_WEB_BASE_URL_REMOTE;

  const [suspendModalVisibility, setSuspendModalVisibility] = useState(false);
  const [deleteModalVisibility, setSDeleteModalVisibility] = useState(false);
  const [archiveModalVisibility, setArchiveModalVisibility] = useState(false);
  const [surveyId, setSurveyId] = useState("");
  const [surveyStatus, setSurveyStatus] = useState("");
  const [isArchivedStatus, setIsArchivedStatus] = useState(false);

  const changeSuspendMobileVisibility = (id, status) => {
    setSuspendModalVisibility(true);
    setSurveyId(id);
    setSurveyStatus(status);
  };

  const changeDeleteMobileVisibility = (id) => {
    setSDeleteModalVisibility(true);
    setSurveyId(id);
  };

  const changeArchiveMobileVisibility = (id, archive) => {
    setArchiveModalVisibility(true);
    setSurveyId(id);
    setIsArchivedStatus(archive);
  };

  const showOutput = async (surveyId) => {
    try {
      // Create a filename from the surveyID and time stamp
      const fileName = `output-${surveyId.split("-")[0]}`;
      if (!registerAccessToken(accessToken(), history, dispatch)) return;
      const [_res, _data] = await api.response.getResponse(surveyId);

      if (_res.status === 200) {
        const { data, mergedCells } = _data;
        await ExportExcel({data, mergedCells, fileName});
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <CustomModal
        visible={suspendModalVisibility}
        onSubmit={async () => {
          await suspendSurvey(surveyId, surveyStatus);
          setSuspendModalVisibility(false);
        }}
        onClose={() => setSuspendModalVisibility(false)}
        message={
          surveyStatus === "ACTIVE"
            ? "Are you sure you want to suspend survey?"
            : "Are you sure you want to activate survey?"
        }
        submitLabel={surveyStatus === "ACTIVE" ? "Suspend" : "Activate"}
        loading={loading}
      />
      <CustomModal
        visible={deleteModalVisibility}
        onSubmit={async () => {
          await deleteSurvey(surveyId);
          setSDeleteModalVisibility(false);
        }}
        onClose={() => setSDeleteModalVisibility(false)}
        message="Are you sure you want to delete survey?"
        submitLabel="Delete Survey"
        loading={loading}
      />
      <CustomModal
        visible={archiveModalVisibility}
        onSubmit={async () => {
          await archiveSurvey(surveyId, isArchivedStatus);
          setArchiveModalVisibility(false);
        }}
        onClose={() => setArchiveModalVisibility(false)}
        message={
          isArchivedStatus
            ? "Are you sure you want to unarchive survey?"
            : "Are you sure you want to archive survey?"
        }
        submitLabel={isArchivedStatus ? "Unarchive Survey" : "Archive Survey"}
        loading={loading}
      />
      <CTableBody>
        {data.map((survey, index) => {
          // var titleID = document.getElementById("title");
          var newNode = document.createElement("p");
          newNode.appendChild(document.createTextNode(survey.title));
          return (
            <CTableRow key={index}>
              {/* <CTableDataCell>{survey.title}</CTableDataCell>
            <CTableDataCell>{survey.surveyID}</CTableDataCell>
            <CTableDataCell>{survey.username}</CTableDataCell>
            <CTableDataCell>{survey.status}</CTableDataCell> */}
              <CTableDataCell>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col px-1">
                    {parse(survey.title)}
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      Survey Status : {survey.surveyStatus ||
                        survey.status}{" "}
                    </p>
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      Created By : {survey.username}{" "}
                    </p>
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      Created Date : {convertTZ(survey.createdDate)}{" "}
                    </p>
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      URL :{" "}
                      <a
                        href={`${baseURL}/survey/${survey.surveyId}`}
                        target="blank"
                      >{`${baseURL}/survey/${survey.surveyId}`}</a>
                    </p>
                    {/* <p className="text-md font-normal text-gray-900 dark:text-white">
                    {" "}
                    Start Date : {survey.startDate}{" "}
                  </p>
                  <p className="text-md font-normal text-gray-900 dark:text-white">
                    {" "}
                    End Date : {survey.endDate}{" "}
                  </p> */}
                  </div>

                  {/* <div className="flex flex-col px-2 py-2">
                  <p className="text-md font-normal text-gray-900 dark:text-white">
                    {" "}
                    Survey Status : {survey.status}{" "}
                  </p>
                  <p className="text-md font-normal text-gray-900 dark:text-white">
                    {" "}
                    Created By : {survey.username}{" "}
                  </p>
                </div> */}

                  <div className="flex flex-cols-2">
                    <div className="flex flex-col px-2">
                      <CButton
                        disabled={loading}
                        className="m-1"
                        color="warning"
                        variant="outline"
                        onClick={() =>
                          changeArchiveMobileVisibility(
                            survey.surveyId,
                            survey.isArchived
                          )
                        }
                      >
                        <span className="text-sm">
                          {" "}
                          {survey.isArchived ? "Unarchive" : "Archive"}
                        </span>
                      </CButton>
                      <CButton
                        disabled={loading}
                        className="m-1"
                        color="info"
                        variant="outline"
                        onClick={() => showOutput(survey.surveyId)}
                      >
                        <span className="text-sm"> Output</span>
                      </CButton>
                    </div>
                    <div className="flex flex-col px-2">
                      {accountType === "designer" ? (
                        <CButton
                          disabled={loading}
                          className="m-1"
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            history.push({
                              pathname: `/designer/viewsurvey/${survey.surveyId}`,
                              state: { surveyID: survey.surveyId },
                            });
                          }}
                        >
                          <span className="text-sm">Details</span>
                        </CButton>
                      ) : null}
                      {(accountType === "admin" || accountType === "designer") &
                      (survey.surveyStatus === "SUSPENDED") ? (
                        <CButton
                          disabled={loading}
                          className="m-1"
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            changeDeleteMobileVisibility(survey.surveyId);
                          }}
                        >
                          <span className="text-sm">Delete</span>
                        </CButton>
                      ) : null}

                      <CButton
                        disabled={loading}
                        className="m-1"
                        color="danger"
                        variant="outline"
                        onClick={() => {
                          changeSuspendMobileVisibility(
                            survey.surveyId,
                            survey.surveyStatus
                          );
                        }}
                      >
                        <span className="text-sm">
                          {" "}
                          {survey.surveyStatus === "ACTIVE"
                            ? "Suspend"
                            : "Activate"}
                        </span>
                      </CButton>
                    </div>
                  </div>
                </div>
              </CTableDataCell>
              {/* <CTableDataCell>
              <CButton
                color="info"
                variant="outline"
                onClick={() => {
                  console.log(survey.role);
                  history.push({
                    pathname: `/admin/${survey.role.toLowerCase()}/view`,
                    state: { username: survey.username },
                  });
                }}
              >
                <span className="text-sm"> View</span>
              </CButton>
            </CTableDataCell> */}
            </CTableRow>
          );
        })}
      </CTableBody>
    </>
  );
};

export default TableBody;
