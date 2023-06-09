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

import { CustomModal } from "../../components";

import FullFlowWidget from "./FullFlowWidget";
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
        res = await api.nodeAllocator.privateCloud.provision();
        break;
      case "private_configure":
        res = await api.nodeAllocator.privateCloud.configure();
        break;
      case "private_destroy":
        res = await api.nodeAllocator.privateCloud.destroy();
        break;
      case "private_apply":
        res = await api.nodeAllocator.privateCloud.apply();
        break;
      case "aws_provision":
        res = await api.nodeAllocator.awsCloud.provision();
        break;
      case "aws_configure":
        res = await api.nodeAllocator.awsCloud.configure();
        break;
      case "aws_destroy":
        res = await api.nodeAllocator.awsCloud.destroy();
        break;
      case "aws_apply":
        res = await api.nodeAllocator.awsCloud.apply();
        break;
      default:
        break;
    }
    if (res.status === 200) {
      toast.success(res.message);
      setLoading(false);
    } else {
      toast.error(res.error_message || res.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <CContainer className="ph-8 pb-16 h-full">
        <CustomModal
          visible={awsModalVisibility}
          message={"Are you sure you want to destroy the AWS Cloud?"}
          onSubmit={async () => {
            await handleButton("aws_destroy");
            setAwsModalVisibility(false);
          }}
          onClose={() => setAwsModalVisibility(false)}
          title={"Destroy AWS Cloud"}
          submitLabel={"Destroy"}
          loading={loading}
        />
        <CustomModal
          visible={privateModalVisibility}
          message={"Are you sure you want to destroy the Private Cloud?"}
          onSubmit={async () => {
            await handleButton("private_destroy");
            setPrivateModalVisibility(false);
          }}
          onClose={() => setPrivateModalVisibility(false)}
          title={"Destroy Private Cloud"}
          submitLabel={"Destroy"}
          loading={loading}
        />
        <FullFlowWidget instanceValues={instanceValues} />
        {/* ----------------------------- Provision ------------------------------------- */}
        <CRow className="pt-16">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Provision <CBadge color="warning">AWS</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Provision the AWS Cloud and create the necessary resources.
                </CCardText>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => handleButton("aws_provision")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Provision
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Provision <CBadge color="danger">Private</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Provision the private Cloud and create the necessary
                  resources,
                </CCardText>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => handleButton("private_provision")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Provision
                </CButton>
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
                  Configure <CBadge color="warning">AWS</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Configure the AWS Cloud with all the resources to deploy
                  microservice applications.
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => handleButton("aws_configure")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Configure
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Configure <CBadge color="danger">Private</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Configure the private Cloud with all the resources to deploy
                  microservice applications.
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => handleButton("private_configure")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Configure
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* ----------------------------- Destroy ------------------------------------- */}
        <CRow className="pt-16">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Destroy <CBadge color="warning">AWS</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Destroy the AWS Cloud with all the resources.
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => setAwsModalVisibility(true)}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Destroy
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Destroy <CBadge color="danger">Private</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Destroy the private Cloud with all the resources
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => setPrivateModalVisibility(true)}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Destroy
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* ----------------------------- Apply ------------------------------------- */}
        <CRow className="pt-16">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Apply changes to <CBadge color="warning">AWS</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Apply changes to the AWS Cloud with all the resources.
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => handleButton("aws_apply")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Apply
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Apply changes to <CBadge color="danger">Private</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Apply changes to the private Cloud with all the resources
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => handleButton("private_apply")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Apply
                </CButton>
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
                  Deploy microservices in <CBadge color="warning">AWS</CBadge>{" "}
                  Cloud
                </CCardTitle>
                <CCardText>Deploy microservices in the AWS Cloud.</CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => handleButton("aws_deploy")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Deploy
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Deploy microservices in{" "}
                  <CBadge color="danger">Private</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Deploy microservices in the private Cloud.
                </CCardText>
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => handleButton("private_deploy")}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Deploy
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};
export default NodeAllocator;
