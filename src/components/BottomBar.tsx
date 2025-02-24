import React from "react";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddChartModal from "./AddChartModal";
import Button from "@mui/material/Button";
import { NavLink } from "react-router";

const BottomBar = ({ addChart }: { addChart: boolean }) => {
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "white",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Toolbar>
          {addChart && <AddChartModal />}
          {!addChart && (
            <NavLink to="/" className={"w-full"}>
              <Button className="w-full" variant="contained">
                Go home
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default BottomBar;
