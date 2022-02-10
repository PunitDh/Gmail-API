import React from "react";
import { Button } from "@mui/material/";
import { batchDeleteEmails } from "../api/api";

function DataHead({ emails, selected, setEmails }) {
  const handleDelete = () => {
    batchDeleteEmails(selected).then((res) => {
      console.log(res.data);
      setEmails(emails.filter((email) => !selected.includes(email.id)));
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          borderRadius: "0.75rem",
        }}
        onClick={handleDelete}
      >
        Delete Selected
      </Button>
      <div style={{ marginLeft: "2rem" }}>{selected.length} selected</div>
      <div style={{ marginLeft: "2rem" }}>{emails.length} emails total</div>
    </div>
  );
}

export default DataHead;
