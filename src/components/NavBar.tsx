import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState, useRef} from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Dialog, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import ChartList from "./ChartList";
import AddChartModal from "./AddChartModal";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsSearchVisible(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  };


  const handleChartSelect = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          height: "64px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" noWrap component="div" className="fixed">
              <img src="/logoipsum.svg" alt="logo" className="w-4/6" />
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isSearchVisible ? (
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "295px",
                  top: "64px",
                  left: "10%",
                  backgroundColor: "grey.200",
                  zIndex: 2,
                }}
              >
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>

                <InputBase
                  ref={inputRef}
                  onBlur={handleBlur}
                  sx={{ flex: 1 }}
                  placeholder="Search..."
                  autoFocus
                  inputProps={{ "aria-label": "search..." }}
                />
              </Paper>
            ) : (
              <IconButton aria-label="search" onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>
            )}
            <IconButton aria-label="menu" onClick={handleDialogOpen}>
              {isDialogOpen ? <CloseIcon /> : <DehazeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        fullScreen
        open={isDialogOpen}
        TransitionComponent={Transition}
        sx={{
          top: "64px",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
        }}
        BackdropProps={{
          style: { backgroundColor: "transparent", pointerEvents: "none" },
        }}
      >
        <div className="m-4" style={{ flex: 1, overflow: "auto" }}>
          <div>
            <ChartList onChartSelect={handleChartSelect} />
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <AddChartModal />
        </div>
      </Dialog>
    </Box>
  );
};

export default NavBar;
