import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material/";
import { searchEmail } from "../utils/utils";

function EmailsAppBar({ emails, fetchEmails }) {
  const [search, setSearch] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
    emails.forEach((email) => {
      const isVisible = searchEmail(email, search);
      document.getElementById(email.id).style.display = isVisible
        ? "flex"
        : "none";
    });
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Reload">
                <IconButton onClick={fetchEmails}>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default EmailsAppBar;
