import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

const CustomModal = ({ visible, onSubmit, onClose, message, submitLabel , title, loading=false}) => {
  return (
    <>
      <CModal visible={visible} onClose={onClose}>
        {/* <CModalHeader>
          <CModalTitle>{ message}</CModalTitle>
        </CModalHeader> */}
        <CModalBody>{message}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
          <CButton color="primary" variant="outline" onClick={onSubmit} disabled={loading}>
            {submitLabel}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CustomModal;
