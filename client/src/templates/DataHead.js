import React from "react";
import { Button } from "@mui/material/";
import { batchDeleteEmails } from "../api/api";
import { DataHeadContainer } from "./utils/styles";

function DataHead({ emails, selected, setEmails }) {
  const handleDelete = () => {
    batchDeleteEmails(selected).then((res) => {
      console.log(res.data);
      setEmails(emails.filter((email) => !selected.includes(email.id)));
    });
  };

  const buttonStyles = {
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: "0.25rem",
  };

  return (
    <DataHeadContainer>
      <Button variant="contained" style={buttonStyles} onClick={handleDelete}>
        Delete Selected
      </Button>
      <div style={{ marginLeft: "2rem" }}>{selected.length} selected</div>
      <div style={{ marginLeft: "2rem" }}>{emails.length} emails total</div>
    </DataHeadContainer>
  );
}

export default DataHead;
