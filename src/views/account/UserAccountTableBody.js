import React from "react";
import { useHistory } from "react-router-dom";

import {
    CButton,
    CTableBody,
    CTableDataCell,
    CTableRow,
    CBadge,
} from "@coreui/react";

const UserAccountTableBody = ({ accounts, handleSuspend }) => {
    const history = useHistory();

    return (
        <>
            <CTableBody>
                {accounts.map((account, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{account.username}</CTableDataCell>
                        <CTableDataCell>{account.name}</CTableDataCell>
                        <CTableDataCell>{account.email}</CTableDataCell>
                        <CTableDataCell>
                            <CBadge
                                color={account.status === "ACTIVE" ? "success" : "warning"}
                            >
                                {account.status}
                            </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                            <CButton
                                color="danger"
                                variant="outline"
                                onClick={() => handleSuspend(account.username, account.status)}
                            >
                                <span className="text-sm"> {account.status === "ACTIVE" ? 'Suspend' : 'Activate'}</span>
                            </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                            <CButton
                                color="info"
                                variant="outline"
                                onClick={() => {
                                    history.push({
                                        pathname: `/admin/${(account.userType).toLowerCase()}/view`,
                                        state: {account: account},
                                    })
                                }
                                }
                            >
                                <span className="text-sm"> View</span>
                            </CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </>
    );
};

export default UserAccountTableBody;
