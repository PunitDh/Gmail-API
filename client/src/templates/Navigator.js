import * as React from "react";
import {
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PolicyIcon from "@mui/icons-material/Policy";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { handleLogin, handleLogout } from "../api/api";
import Privacy from "../Privacy";
import Content from "./Content";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
  width: "100%",
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const { me, setMe } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 20, color: "#fff" }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              textDecoration: "none",
            }}
          >
            <Logo />
            <Typography
              variant="h6"
              color="#fff"
              style={{ textAlign: "center" }}
            >
              Gmail Bulk Delete API
            </Typography>
          </Link>
        </ListItem>

        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem disablePadding>
            <Link
              to="/privacy"
              style={{ textDecoration: "none", width: "100%" }}
            >
              <ListItemButton
                selected={props.Component === Privacy}
                sx={item}
                onClick={() => {}}
              >
                <ListItemIcon>
                  <PolicyIcon />
                </ListItemIcon>
                <ListItemText>Privacy Policy</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/home" style={{ textDecoration: "none", width: "100%" }}>
              <ListItemButton
                selected={props.Component === Content}
                sx={item}
                onClick={() => {}}
              >
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>Emails</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={false}
              sx={item}
              onClick={me ? () => handleLogout(setMe) : handleLogin}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>{me ? "Logout" : "Login"}</ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider sx={{ mt: 2 }} />
        </Box>
      </List>
    </Drawer>
  );
}
