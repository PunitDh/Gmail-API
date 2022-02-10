import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableHeadCell,
  TableCheckboxCell,
  TableCell,
} from "./utils/styles";
import { sortEmails } from "./utils/utils";

const SORTS = {
  From: "From",
  Subject: "Subject",
  Date: "Date",
  Snippet: "snippet",
};

function DataTable({ emails, setEmails, selected, setSelected }) {
  const [sortBy, setSortBy] = useState(SORTS.Date);
  const [sortDirection, setSortDirection] = useState(false);

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

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    setSortDirection(!sortDirection);
    setEmails(sortEmails(emails, sortBy, sortDirection));
  };

  console.log({ sortBy, sortDirection });

  return (
    <div>
      <Table>
        <TableBody>
          <TableHead>
            <TableCheckboxCell>
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                onChange={handleSelectAll}
              />
            </TableCheckboxCell>
            <TableHeadCell onClick={() => handleSort(SORTS.From)}>
              From {sortBy === SORTS.From ? (sortDirection ? "▲" : "▼") : null}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort(SORTS.Subject)}>
              Subject{" "}
              {sortBy === SORTS.Subject ? (sortDirection ? "▲" : "▼") : null}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort(SORTS.Snippet)}>
              Message{" "}
              {sortBy === SORTS.Snippet ? (sortDirection ? "▲" : "▼") : null}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort(SORTS.Date)}>
              Date {sortBy === SORTS.Date ? (sortDirection ? "▲" : "▼") : null}
            </TableHeadCell>
          </TableHead>
          {emails.map((email) => (
            <TableRow
              key={email.id}
              id={email.id}
              style={{ cursor: "pointer" }}
            >
              <TableCheckboxCell emailId={email.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${email.id}`}
                  value={email.id}
                  onChange={(e) => handleSelect(e)}
                />
              </TableCheckboxCell>
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
