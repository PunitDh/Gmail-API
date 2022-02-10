import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material/";
import LinearProgress from "@mui/material/LinearProgress";
import { getMe, getEmailIDs, getEmails } from "../api/api";
import { extractData } from "../api/utils";
import LoginButton from "./LoginButton";
import DataTable from "./DataTable";
import DataHead from "./DataHead";
import EmailsAppBar from "./EmailsAppBar";
import { EmailsContainer, LoadingBarContainer } from "./utils/styles";

export default function Content({ me, setMe }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getMe(setMe);
  }, []);

  const fetchEmails = () => {
    setLoading(true);
    if (me) {
      getEmailIDs().then((res) => {
        const emailIDs = res.data;
        getEmails(emailIDs).then((response) => {
          console.log(response.data);
          const es = extractData(response.data);
          setEmails(es);
          setLoading(false);
        });
      });
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [me]);

  return (
    <Paper sx={{ maxWidth: "100%", margin: "auto" }}>
      {me ? (
        <div>
          <EmailsAppBar
            emails={emails}
            fetchEmails={fetchEmails}
            loading={loading}
          />
          <div>
            {loading ? (
              <LoadingBarContainer>
                <LinearProgress style={{ width: "100%" }} />
              </LoadingBarContainer>
            ) : null}
            {me && emails.length > 0 && (
              <EmailsContainer>
                <DataHead
                  emails={emails}
                  setEmails={setEmails}
                  selected={selected}
                />
                <DataTable
                  emails={emails}
                  setEmails={setEmails}
                  selected={selected}
                  setSelected={setSelected}
                />
              </EmailsContainer>
            )}
          </div>
        </div>
      ) : (
        <LoginButton setMe={setMe} />
      )}
    </Paper>
  );
}
