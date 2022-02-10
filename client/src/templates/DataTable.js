import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
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

  const handleRowSelect = (emailId) => {
    const checkbox = document.getElementById(`checkbox-${emailId}`);
    checkbox.click();
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

  const sortText = (sortedBy) =>
    sortBy === sortedBy ? (sortDirection ? "▲" : "▼") : null;

  return (
    <div>
      <Table>
        <TableHead>
          <TableCheckboxCell>
            <input
              type="checkbox"
              style={{ cursor: "pointer" }}
              onChange={handleSelectAll}
            />
          </TableCheckboxCell>
          <TableHeadCell onClick={() => handleSort(SORTS.From)}>
            From {sortText(SORTS.From)}
          </TableHeadCell>
          <TableHeadCell onClick={() => handleSort(SORTS.Subject)}>
            Subject {sortText(SORTS.Subject)}
          </TableHeadCell>
          <TableHeadCell onClick={() => handleSort(SORTS.Snippet)}>
            Message {sortText(SORTS.Snippet)}
          </TableHeadCell>
          <TableHeadCell onClick={() => handleSort(SORTS.Date)}>
            Date {sortText(SORTS.Date)}
          </TableHeadCell>
        </TableHead>
        {emails.map((email) => (
          <TableRow
            key={email.id}
            id={email.id}
            onClick={() => handleRowSelect(email.id)}
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
      </Table>
    </div>
  );
}

export default DataTable;
