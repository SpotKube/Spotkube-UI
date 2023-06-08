import React from "react";

import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CCardTitle,
  CCardText,
  CButton,
  CBadge,
  CWidgetStatsD,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cibAmazonAws, cibServerFault } from "@coreui/icons";
import { CChartLine } from "@coreui/react-chartjs";

const Dashboard = () => {
  return (
    <>
      <CContainer className="ph-8 pb-16 h-full">
        <CRow>
          <CCol xs={6}>
            <CWidgetStatsD
              className="mb-3"
              icon={
                <CIcon
                  className="my-4 text-white"
                  icon={cibAmazonAws}
                  height={52}
                />
              }
              chart={
                <CChartLine
                  className="position-absolute w-100 h-100"
                  data={{
                    labels: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                    ],
                    datasets: [
                      {
                        backgroundColor: "rgba(255,255,255,.1)",
                        borderColor: "rgba(255,255,255,.55)",
                        pointHoverBackgroundColor: "#fff",
                        borderWidth: 2,
                        data: [65, 59, 84, 84, 51, 55, 40],
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      line: {
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                      },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                  }}
                />
              }
              style={{ "--cui-card-cap-bg": "#FF9900" }}
              values={[
                { title: "Spot Instances", value: "4" },
                // { title: "feeds", value: "459" },
              ]}
            />
          </CCol>
          <CCol xs={6}>
            <CWidgetStatsD
              className="mb-3"
              icon={
                <CIcon
                  className="my-4 text-white"
                  icon={cibServerFault}
                  height={52}
                />
              }
              chart={
                <CChartLine
                  className="position-absolute w-100 h-100"
                  data={{
                    labels: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                    ],
                    datasets: [
                      {
                        backgroundColor: "rgba(255,255,255,.1)",
                        borderColor: "rgba(255,255,255,.55)",
                        pointHoverBackgroundColor: "#fff",
                        borderWidth: 2,
                        data: [1, 13, 9, 17, 34, 41, 38],
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      line: {
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                      },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                  }}
                />
              }
              style={{ "--cui-card-cap-bg": "#f80000" }}
              values={[
                { title: "Private Instances", value: "2" },
                // { title: "tweets", value: "1.792" },
              ]}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Startup <CBadge color="warning">AWS</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Start up the AWS Cloud and create the necessary resources,
                  deploy microservices.
                </CCardText>
                <CButton color="success" variant="outline">
                  Start
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Startup <CBadge color="danger">Private</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Start up the private Cloud and create the necessary resources,
                  deploy microservices.
                </CCardText>
                <CButton color="success" variant="outline">
                  Start
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};
export default Dashboard;
