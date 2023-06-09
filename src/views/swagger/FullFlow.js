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

const FullFlow = () => {
  const [instanceValues, setInstanceValues] = useState({
    spotInstances: 4,
    privateInstances: 2,
  });

  const [loading, setLoading] = useState(false);

  // Modal related states
  const [awsModalVisibility, setAwsModalVisibility] = useState(false);
  const [privateModalVisibility, setPrivateModalVisibility] = useState(false);

  // Startup AWS Cloud
  const startupAWS = async () => {
    setLoading(true);
    const res = await api.fullFlow.startUpAwsCloud();
    console.log(res);
    if (res.status === 200) {
      toast.success(res.message);
      setLoading(false);
    } else {
      toast.error(res.error_message || res.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Startup Private Cloud
  const startupPrivate = async () => {
    setLoading(true);
    const res = await api.fullFlow.startUpPrivateCloud();
    console.log(res);
    if (res.status === 200) {
      toast.success(res.message);
      setLoading(false);
    } else {
      toast.error(res.error_message || res.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Destroy AWS Cloud
  const destroyAWS = async () => {
    setLoading(true);
    const res = await api.nodeAllocator.destroyAWS();
    console.log(res);
    if (res.status === 200) {
      toast.success(res.message);
      setLoading(false);
    } else {
      toast.error(res.error_message || res.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Destroy Private Cloud
  const destroyPrivate = async () => {
    setLoading(true);
    const res = await api.nodeAllocator.destroyPrivate();
    console.log(res);
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
            await destroyAWS();
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
            await destroyPrivate();
            setPrivateModalVisibility(false);
          }}
          onClose={() => setPrivateModalVisibility(false)}
          title={"Destroy Private Cloud"}
          submitLabel={"Destroy"}
          loading={loading}
        />
        <FullFlowWidget instanceValues={instanceValues} />
        <CRow className="pt-16">
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  Startup <CBadge color="warning">AWS</CBadge> Cloud
                </CCardTitle>
                <CCardText>
                  Start up the AWS Cloud and create the necessary resources, and
                  deploy microservices.
                </CCardText>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={startupAWS}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
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
                  and deploy microservices.
                </CCardText>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={startupAWS}
                  disabled={loading}
                >
                  {loading && (
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                  )}{" "}
                  Start
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
      </CContainer>
    </>
  );
};
export default FullFlow;
