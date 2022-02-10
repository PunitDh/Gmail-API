import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableHeadCell,
  TableCell,
} from "./utils/styles";

function DataTable({ emails, selected, setSelected }) {
  const handleSelect = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
      document.getElementById(e.target.value).style.backgroundColor =
        "lightyellow";
    } else {
      setSelected(selected.filter((email) => email !== e.target.value));
      document.getElementById(e.target.value).style.backgroundColor = "";
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(emails.map((email) => email.id));
      emails.forEach((email) => {
        document.getElementById(email.id).style.backgroundColor = "lightyellow";
        document.getElementById(`checkbox-${email.id}`).checked = true;
      });
    } else {
      setSelected([]);
      emails.forEach((email) => {
        document.getElementById(email.id).style.backgroundColor = "";
        document.getElementById(`checkbox-${email.id}`).checked = false;
      });
    }
  };

  return (
    <div>
      <Table
        style={{
          marginLeft: "0.25rem",
          textAlign: "left",
          borderCollapse: "collapse",
          fontSize: "0.8rem",
        }}
      >
        <TableBody>
          <TableHead>
            <TableHeadCell
              style={{
                width: "5%",
                marginRight: "1rem",
              }}
            >
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                onChange={handleSelectAll}
              />
            </TableHeadCell>
            <TableHeadCell>From</TableHeadCell>
            <TableHeadCell>Subject</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
          </TableHead>
          {emails.map((email) => (
            <TableRow
              key={email.id}
              id={email.id}
              style={{ cursor: "pointer" }}
            >
              <TableHeadCell
                style={{ width: "5%", marginRight: "1rem" }}
                emailId={email.id}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${email.id}`}
                  value={email.id}
                  onChange={(e) => handleSelect(e)}
                />
              </TableHeadCell>
              <TableCell emailId={email.id}>{email.From}</TableCell>
              <TableCell emailId={email.id}>{email.Subject}</TableCell>
              <TableCell emailId={email.id}>
                {email.snippet.substr(0, 50)}...
              </TableCell>
              <TableCell emailId={email.id}>{email.Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
