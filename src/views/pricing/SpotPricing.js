import React, { useEffect, useState } from "react";

import {
  CContainer,
  CRow,
  CCallout,
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

import PriceWidget from "./PriceWidget";

const SpotPricing = () => {

  const [loading, setLoading] = useState(false);
  const [spotValues, setSpotValues] = useState([]);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    const res = await api.dashboard.spotInstances();
    console.log(res.data);
    if (res.status === 200) {
      setSpotValues(res.data || []);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colorList = ["danger", "warning", "success", "info"];
  const spotPricingLength = spotValues?.length;

  // Generate a new list of colors based on the spotPricing length
  const generatedColors = [];
  for (let i = 0; i < spotPricingLength; i++) {
    const colorIndex = i % colorList.length;
    generatedColors.push(colorList[colorIndex]);
  }

  return (
    <>
      <CContainer className="ph-8 pb-16 h-full">
        <CCallout color="dark">
          These are the recent spot pricing for the instances you have
        </CCallout>
        <CRow>
          {spotValues &&
            spotValues.map((instance, index) => (
              <PriceWidget
                key={index}
                instance={instance}
                color={generatedColors[index]}
              />
            ))}
        </CRow>
      </CContainer>
    </>
  );
};
export default SpotPricing;

const demoData = [
  {
    instanceId: "i-0190aff3de81136d1",
    instanceType: "t3.medium",
    onDemandPricing: 0.0499,
    count:1,
    spotPricing: [
      { timestamp: "2023-06-07T09:49:29+00:00", price: "0.020100" },
      { timestamp: "2023-06-07T15:18:58+00:00", price: "0.020000" },
      { timestamp: "2023-06-08T04:19:58+00:00", price: "0.020100" },
      { timestamp: "2023-06-08T07:34:31+00:00", price: "0.020200" },
      { timestamp: "2023-06-08T15:19:31+00:00", price: "0.020300" },
      { timestamp: "2023-06-09T07:48:57+00:00", price: "0.020400" },
      { timestamp: "2023-06-09T14:04:01+00:00", price: "0.020300" },
      { timestamp: "2023-06-10T00:10:43+00:00", price: "0.020300" },
      { timestamp: "2023-06-10T09:04:54+00:00", price: "0.020500" },
      { timestamp: "2023-06-10T17:19:55+00:00", price: "0.020400" },
    ],
  },
  
  {
    instanceId: "i-0987654321fedcba",
    instanceType: "t2.medium",
    onDemandPricing: 0.025,
    count:1,
    spotPricing: [
      { timestamp: "2023-06-11T09:49:29+00:00", price: "0.018000" },
      { timestamp: "2023-06-11T15:18:58+00:00", price: "0.018100" },
      { timestamp: "2023-06-12T04:19:58+00:00", price: "0.018200" },
      { timestamp: "2023-06-12T07:34:31+00:00", price: "0.018300" },
      { timestamp: "2023-06-12T15:19:31+00:00", price: "0.018400" },
      { timestamp: "2023-06-13T07:48:57+00:00", price: "0.018500" },
      { timestamp: "2023-06-13T14:04:01+00:00", price: "0.018400" },
      { timestamp: "2023-06-14T00:10:43+00:00", price: "0.018400" },
      { timestamp: "2023-06-14T09:04:54+00:00", price: "0.018600" },
      { timestamp: "2023-06-14T17:19:55+00:00", price: "0.018500" },
    ],
  },
  {
    instanceId: "i-fedcba9876543210",
    instanceType: "t2.large",
    onDemandPricing: 0.015,
    count:1,
    spotPricing: [
      { timestamp: "2023-06-11T09:49:29+00:00", price: "0.016000" },
      { timestamp: "2023-06-11T15:18:58+00:00", price: "0.016100" },
      { timestamp: "2023-06-12T04:19:58+00:00", price: "0.016200" },
      { timestamp: "2023-06-12T07:34:31+00:00", price: "0.016300" },
      { timestamp: "2023-06-12T15:19:31+00:00", price: "0.016400" },
      { timestamp: "2023-06-13T07:48:57+00:00", price: "0.016500" },
      { timestamp: "2023-06-13T14:04:01+00:00", price: "0.016400" },
      { timestamp: "2023-06-14T00:10:43+00:00", price: "0.016400" },
      { timestamp: "2023-06-14T09:04:54+00:00", price: "0.016600" },
      { timestamp: "2023-06-14T17:19:55+00:00", price: "0.016500" },
    ],
  },
];
