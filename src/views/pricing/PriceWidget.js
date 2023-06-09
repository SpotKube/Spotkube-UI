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
  CDropdown,
  CDropdownMenu,
  CWidgetStatsA,
  CDropdownToggle,
  CDropdownItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cibAmazonAws,
  cibServerFault,
  cilArrowTop,
  cilOptions,
} from "@coreui/icons";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";
import api from "../../api";
import { toast } from "react-toastify";

const PriceWidget = ({ instance, color }) => {
  const title = instance.instanceType;
  const spotPrices = instance.spotPricing.map((item) => item.price);
  const lastValue = spotPrices[spotPrices.length - 1];

  console.log(spotPrices);
  return (
    <>
      <CCol sm={6}>
        <CWidgetStatsA
          className="mb-4"
          color={color}
          value={
            <>
              $ {`${title} x ${instance.count || 1}` }
              <span className="fs-6 fw-normal px-2">
                (On demand price: ${instance.onDemandPricing}
                <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title={`Latest spot price: $${lastValue}`}
          chart={
            <CChartLine
              className="mt-4 mb-4 mx-3"
              style={{ height: "85px" }}
              data={{
                labels: ["", "", "", "", "", "", "", "", "", ""],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: "#321fdb",
                    data: spotPrices,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </>
  );
};
export default PriceWidget;
