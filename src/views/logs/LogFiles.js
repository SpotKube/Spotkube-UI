import React, { useState } from "react";

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
  CSpinner,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cibAmazonAws, cibServerFault } from "@coreui/icons";
import { CChartLine } from "@coreui/react-chartjs";
import api from "../../api";
import { toast } from "react-toastify";

const NodeAllocator = () => {
  const [instanceValues, setInstanceValues] = useState({
    spotInstances: 4,
    privateInstances: 2,
  });

  const [loading, setLoading] = useState(false);

  // Modal related states
  const [awsModalVisibility, setAwsModalVisibility] = useState(false);
  const [privateModalVisibility, setPrivateModalVisibility] = useState(false);

  // Startup AWS Cloud
  const handleButton = async (fnName) => {
    setLoading(true);
    let res;
    let fileName = "";
    switch (fnName) {
      case "private_provision":
        res = await api.logs.privateCloud.provisioning();
        fileName = "private_provision";
        break;
      case "private_configure":
        res = await api.logs.privateCloud.configuring();
        fileName = "private_configure";
        break;
      case "private_deploy":
        res = await api.logs.privateCloud.deploying();
        fileName = "private_deploy";
        break;
      case "aws_provision":
        res = await api.logs.awsCloud.provisioning();
        fileName = "aws_provision";
        break;
      case "aws_configure":
        res = await api.logs.awsCloud.configuring();
        fileName = "aws_configure";
        break;
      case "aws_deploy":
        res = await api.logs.awsCloud.deploying();
        fileName = "aws_deploy";
        break;
      default:
        break;
    }
    if (res.status === 200) {
      downloadLogFile(res.data, fileName);
      setLoading(false);
    } else {
      toast.error(res.error_message || res.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Download the log file
  const downloadLogFile = async (data, fName) => {
    try {
      // Create a Blob object from the log data
      const blob = new Blob([data], { type: "text/plain" });

      // Create a temporary URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      const fileName = `${fName}_${formattedDate}_${formattedTime}.log`;

      // Create a link element and set its attributes for downloading
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      // Programmatically click the link to initiate the download
      link.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CContainer className="ph-8 pb-16 h-full">
        {/* ----------------------------- Provision ------------------------------------- */}
        <CRow className="pt-12">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <CBadge color="warning">AWS</CBadge> Cloud Provisioning Log
                </CCardTitle>
                <CCardText>
                  {/* Provision the AWS Cloud and create the necessary resources. */}
                </CCardText>
                <div sm={6} className="flex flex-row justify-end">
                  <CButton
                    color="success"
                    variant="outline"
                    onClick={() => handleButton("aws_provision")}
                    disabled={loading}
                  >
                    {/* {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "} */}
                    Download
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <CBadge color="danger">Private</CBadge> Cloud Provisioning Log
                </CCardTitle>
                <CCardText></CCardText>
                <div sm={6} className="flex flex-row justify-end">
                  <CButton
                    color="success"
                    variant="outline"
                    onClick={() => handleButton("private_provision")}
                    disabled={loading}
                  >
                    {/* {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "} */}
                    Download
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* ----------------------------- Configure ------------------------------------- */}
        <CRow className="pt-16">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <CBadge color="warning">AWS</CBadge> Cloud Configuring Log
                </CCardTitle>
                <div sm={6} className="flex flex-row justify-end">
                  <CButton
                    color="success"
                    variant="outline"
                    onClick={() => handleButton("aws_configure")}
                    disabled={loading}
                  >
                    {/* {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "} */}
                    Download
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <CBadge color="danger">Private</CBadge> Cloud Configuring Log
                </CCardTitle>
                <CCardText></CCardText>
                <div sm={6} className="flex flex-row justify-end">
                  <CButton
                    color="success"
                    variant="outline"
                    onClick={() => handleButton("private_configure")}
                    disabled={loading}
                  >
                    {/* {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "} */}
                    Download
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* ----------------------------- Deploy ------------------------------------- */}
        <CRow className="pt-16">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <CBadge color="warning">AWS</CBadge> Cloud Deploying Log
                </CCardTitle>
                <CCardText></CCardText>
                <div sm={6} className="flex flex-row justify-end">
                  <CButton
                    sm={6}
                    color="success"
                    variant="outline"
                    onClick={() => handleButton("aws_deploy")}
                    disabled={loading}
                  >
                    {/* {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "} */}
                    Download
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <CBadge color="danger">Private</CBadge> Cloud Deploying Log
                </CCardTitle>
                <CCardText></CCardText>
                <div sm={6} className="flex flex-row justify-end">
                  <CButton
                    color="success"
                    variant="outline"
                    onClick={() => handleButton("private_deploy")}
                    disabled={loading}
                  >
                    {/* {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "} */}
                    Download
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};
export default NodeAllocator;
