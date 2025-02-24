import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
