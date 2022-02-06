import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { handleLogin, handleLogout } from "../api/auth";

function Header({ me, setMe, onDrawerToggle }) {
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item></Grid>
            <Grid item></Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                {me ? (
                  <Avatar src={me.picture} alt={me.name} />
                ) : (
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Bulk delete all your emails from here
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              {me ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  Welcome, {me.name}
                  <Button
                    variant="contained"
                    color="error"
                    type="submit"
                    onClick={() => handleLogout(setMe)}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "blue" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={0} textColor="inherit">
          <Tab label="Bulk Delete Emails" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
