import React from "react";

import {
    CTableBody,
    CTableDataCell,
    CTableRow,
    CBadge,
} from "@coreui/react";
import { convertTZ, convertTZWithTime } from "../../utils/functions";

const TableBody = ({ data }) => {
    console.log(data);
    return (
        <>
            <CTableBody>
                {data?.surveyTableBackup?.BackupSummaries.map((backup, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{convertTZWithTime(backup['BackupCreationDateTime'])}</CTableDataCell>
                        <CTableDataCell>
                            <CBadge
                                color={backup.BackupStatus === "AVAILABLE" ? "success" : "warning"}
                            >
                                {backup.BackupStatus}
                            </CBadge>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </>
    );
};

export default TableBody;
