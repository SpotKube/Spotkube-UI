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
    switch (fnName) {
      case "private_provision":
        res = await api.logs.privateCloud.provisioning();
        break;
      case "private_configure":
        res = await api.logs.privateCloud.configuring();
        break;
      case "private_deploy":
        res = await api.logs.privateCloud.deploying();
        break;
      case "aws_provision":
        res = await api.logs.awsCloud.provisioning();
        break;
      case "aws_configure":
        res = await api.logs.awsCloud.configuring();
        break;
      case "aws_deploy":
        res = await api.logs.awsCloud.deploying();
        break;
      default:
        break;
    }
    if (res.status === 200) {
      downloadLogFile(res.data);
      setLoading(false);
    } else {
      toast.error(res.error_message || res.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Download the log file
  const downloadLogFile = async (data) => {
    // Create a Blob object from the log data
    const blob = new Blob([data], { type: "text/plain" });

    // Create a temporary URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Create a link element and set its attributes for downloading
    const link = document.createElement("a");
    link.href = url;
    link.download = "aws_terraform.log";

    // Programmatically click the link to initiate the download
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <CContainer className="ph-8 pb-16 h-full">
        {/* ----------------------------- Provision ------------------------------------- */}
        <CRow className="pt-16">
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
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "}
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
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "}
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
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "}
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
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "}
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
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "}
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
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}{" "}
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
