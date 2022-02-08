import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Paper,
  Grid,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material/";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getMe,
  handleLogin,
  getEmailIDs,
  getEmails,
  batchDeleteEmails,
} from "../api/api";
import { extractData } from "../api/utils";

export default function Content({ me, setMe }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getMe(setMe);
  }, []);

  useEffect(() => {
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
  }, [me]);

  const handleDelete = () => {
    batchDeleteEmails(selected).then((res) => {
      console.log(res.data);
      setEmails(emails.filter((email) => !selected.includes(email.id)));
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "id",
      width: "0",
      renderCell: (params) => {
        return <>{params.row.id}</>;
      },
    },
    {
      field: "From",
      headerName: "From",
      width: "200",
      renderCell: (params) => {
        return <>{params.row["From"]}</>;
      },
    },
    {
      field: "Subject",
      headerName: "Subject",
      width: "200",
      renderCell: (params) => {
        return <>{params.row["Subject"]}</>;
      },
    },
    {
      field: "Message",
      headerName: "Message",
      width: "200",
      renderCell: (params) => {
        return <>{params.row["snippet"]}</>;
      },
    },
    {
      field: "Date",
      headerName: "Date",
      width: "200",
      renderCell: (params) => {
        return <>{params.row["Date"]}</>;
      },
      valueGetter: (params) => {
        return Date.parse(params.row["Date"]);
      },
    },
  ];

  return (
    <Paper sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden" }}>
      {me ? (
        <div>
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
                  />
                </Grid>
                <Grid item>
                  <Tooltip title="Reload">
                    <IconButton>
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Typography
            sx={{ my: 0, mx: 0 }}
            color="text.secondary"
            align="center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <LinearProgress style={{ width: "100%" }} />
              </div>
            ) : null}
            {me && emails.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Button variant="contained" onClick={handleDelete}>
                  Delete Selected
                </Button>
                <div style={{ height: 1600, width: "100%" }}>
                  <DataGrid
                    rows={emails}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100, 200, 300, 400, 500]}
                    checkboxSelection
                    columnVisibilityModel={{ id: false }}
                    onSelectionModelChange={(e) => setSelected(e)}
                  />
                </div>
              </div>
            ) : null}
          </Typography>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <GoogleButton
            style={{ position: "fixed" }}
            onClick={() => handleLogin(setMe)}
          />
        </div>
      )}
    </Paper>
  );
}
