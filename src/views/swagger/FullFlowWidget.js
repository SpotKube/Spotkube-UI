import React from "react";

import { CRow, CCol, CWidgetStatsD } from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cibAmazonAws, cibServerFault } from "@coreui/icons";
import { CChartLine } from "@coreui/react-chartjs";

const awsPrometheusUrl = process.env.REACT_APP_AWS_PROMETHEUS_URL;
const privatePrometheusUrl = process.env.REACT_APP_PRIVATE_PROMETHEUS_URL;

const FullFlowWidget = ({ instanceValues }) => {
  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CWidgetStatsD
            onClick={() => {
              window.open(awsPrometheusUrl, "_blank");
            }}
            className="mb-3 cursor-pointer"
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
                  labels: ["", "", "", "", "", "", ""],
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
              {
                title: "Spot Instances",
                value: instanceValues?.spotInstances ?? "0",
              },
              // { title: "feeds", value: "459" },
            ]}
          />
        </CCol>
        <CCol xs={6}>
          <CWidgetStatsD
            onClick={() => {
              window.open(privatePrometheusUrl, "_blank");
            }}
            className="mb-3 cursor-pointer"
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
                  labels: ["", "", "", "", "", "", ""],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.1)",
                      borderColor: "rgba(255,255,255,.55)",
                      // pointHoverBackgroundColor: "#fff",
                      // borderWidth: 2,
                      data: [1, 13, 9, 17, 34, 41, 38],
                      fill: false,
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
                      hoverBorderWidth: 0,
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
              {
                title: "Private Instances",
                value: instanceValues?.privateInstances ?? "0",
              },
              // { title: "tweets", value: "1.792" },
            ]}
          />
        </CCol>
      </CRow>
    </>
  );
};
export default FullFlowWidget;
