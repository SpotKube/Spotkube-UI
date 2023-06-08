import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api, { registerAccessToken } from "../../api";
import { accessToken } from "../../store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CButton } from "@coreui/react";

// Components
import { LoadingIndicator } from "../../components";
const Table = React.lazy(() => import("./Table"));
const TableBody = React.lazy(() => import("./TableBody"));

const BackupListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  /*
   * Fetch backups
   */
  const fetchData = async () => {
    setLoading(true);
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    const [res, _data] = await api.backups.listBackups();
    if (res.status === 200) {
      setData(_data);
    } else {
      toast.error("Error Occurred, Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData().catch((err) => {
      console.log(err);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle pagination
  const maxPages = 1;
  const [pageNumber, setPageNumber] = useState(1);

  // Handle create backup
  const handleCreateBackup = async () => {
    setLoading(true);
    try {
      const [res, data] = await api.backups.create();
      if (res.status === 200) {
        toast.success("Successfully backed up.");
      } else {
        toast.error("Error Occurred, Please try again later.");
      }
    } catch (error) {
      toast.error("Error Occurred, Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const tableHeaderCells = ["Backup Date", "Availability"];

  return (
    <>
      {loading ? (
        <div className="flex justify-center"> {LoadingIndicator("lg")} </div>
      ) : (
        <div>
          <div className="grid justify-end">
            <CButton
              disabled={loading}
              color="primary"
              variant="outline"
              className="mb-4"
              onClick={handleCreateBackup}
            >
              {" "}
              Create Backup{" "}
            </CButton>
          </div>
          <Table
            data={data}
            maxPages={maxPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            tableHeaderCells={tableHeaderCells}
          >
            <TableBody data={data} />
          </Table>
        </div>
      )}
    </>
  );
};

export default BackupListPage;
