import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api, { registerAccessToken } from "../../api";
import { accessToken } from "../../store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Components
import { LoadingIndicator } from "../../components";
const AccountTable = React.lazy(() => import("./AccountTable"));
const AccountTableBody = React.lazy(() => import("./UserAccountTableBody"));

const UserAccountListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentLocation = useLocation().pathname;

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountsType, setAccountsType] = useState("");

  /*
   * Fetch User Accounts
   */
  const fetchData = async () => {
    const accountType = currentLocation.split("/")[2];
    setLoading(true);
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    let res;
    let data;
    if (accountType === "designer") {
      console.log("designer");
      [res, data] = await api.user.viewDesigners();
      console.log(res, data);
    } else {
      [res, data] = await api.user.viewAdmins();
    }

    if (res.status === 200) {
      setAccounts(data);
    } else {
      toast.error("Error Occurred, Please try again later.");
    }
    setAccountsType(accountType);
    setLoading(false);
  };

  useEffect(() => {
    fetchData().catch((err) => {console.log(err); setLoading(false)});   
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle pagination
  const maxPages = 1;
  const [pageNumber, setPageNumber] = useState(1);

  const tableHeaderCells = ["Username", "Full Name", "email", "status"];

  // Handle Suspend/Activate button.
  const handleSuspend = async (username, status) => {
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    let res;
    let data;
    if (status === "ACTIVE") {
      [res, data] = await api.user.suspend(username);
    } else {
      [res, data] = await api.user.activate(username);
    }
    console.log(res, data);
    if (res.status === 200) {
        toast.success("Successfully Updated");
        fetchData().catch((err) => console.log(err));
    } else {
      toast.error(
        res.message ? res.message : "Error occurred. Please try again later."
      );
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center"> {LoadingIndicator("lg")} </div>
      ) : (
        <AccountTable
          accounts={accounts}
          maxPages={maxPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          tableHeaderCells={tableHeaderCells}
          accountsType={accountsType}
        >
          <AccountTableBody accounts={accounts} handleSuspend={handleSuspend} />
        </AccountTable>
      )}
    </>
  );
};

export default UserAccountListPage;
