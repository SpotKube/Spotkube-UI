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
} from "@coreui/react";

const Dashboard = () => {
  return (
    <>
      <CContainer className="py-16 h-full">
        <CRow>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>Startup AWS Cloud</CCardTitle>
                <CCardText>
                  Start up the AWS Cloud and create the necessary resources,
                  deploy microservices.
                </CCardText>
                <CButton href="#">Start</CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>Startup private Cloud</CCardTitle>
                <CCardText>
                  Start up the private Cloud and create the necessary resources,
                  deploy microservices.
                </CCardText>
                <CButton href="#">Start</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};
export default Dashboard;
