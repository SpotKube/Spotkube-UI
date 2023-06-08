import React from "react";
import { useHistory } from "react-router-dom";

import { CButton, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
const parse = require("html-react-parser");

const TableBody = ({ data, suspendSurvey, archiveSurvey }) => {
  const history = useHistory();
  const baseURL = process.env.REACT_APP_WEB_BASE_URL_REMOTE;
  return (
    <>
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
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {" "}
                      Survey ID : {survey.surveyId}
                    </p>
                    <span className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      Title : </span> {parse(survey.title)}
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      Survey Status : {survey.status}{" "}
                    </p>
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      Created By : {survey.username}{" "}
                    </p>
                    <p className="text-md font-normal text-gray-900 dark:text-white">
                      {" "}
                      URL : <a href={`${baseURL}/survey/${survey.surveyId}`} target='blank'>{`${baseURL}/survey/${survey.surveyId}`}</a>
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
                        className="m-1"
                        color="warning"
                        variant="outline"
                        onClick={() =>
                          archiveSurvey(survey.surveyId, survey.isArchived)
                        }
                      >
                        <span className="text-sm">
                          {" "}
                          {survey.isArchived ? "Unarchive" : "Archive"}
                        </span>
                      </CButton>
                      <CButton
                        className="m-1"
                        color="info"
                        variant="outline"
                        onClick={suspendSurvey}
                      >
                        <span className="text-sm"> Output</span>
                      </CButton>
                    </div>
                    <div className="flex flex-col px-2">
                      <CButton
                        className="m-1"
                        color="danger"
                        variant="outline"
                        onClick={() => {
                          history.push({
                            pathname: `/admin/survey/view`,
                            state: { surveyID: survey.surveyID },
                          });
                        }}
                      >
                        <span className="text-sm">Details</span>
                      </CButton>
                      <CButton
                        className="m-1"
                        color="danger"
                        variant="outline"
                        onClick={() =>
                          suspendSurvey(survey.surveyId, survey.status)
                        }
                      >
                        <span className="text-sm">
                          {" "}
                          {survey.status === "ACTIVE" ? "Suspend" : "Activate"}
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
