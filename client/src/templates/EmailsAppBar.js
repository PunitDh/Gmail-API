import React from "react";
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
import "./refreshicon.css";

function EmailsAppBar({ fetchEmails, loading, search, handleSearch }) {
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
                placeholder="Search by email address, subject line, or message"
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
                  <RefreshIcon
                    color="inherit"
                    sx={{ display: "block" }}
                    className={loading ? "refresh-icon-rotate" : null}
                  />
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
