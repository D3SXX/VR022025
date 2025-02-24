import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import ChartList from "./ChartList";
import AddChartModal from "./AddChartModal";

const drawerWidth = "250px";

const SideBar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Stack spacing={3} className="m-4 mt-8 text-center">
          <img src="/logoipsum.svg" alt="logo" className="w-3/6" />
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "auto",
              backgroundColor: "grey.200",
            }}
          >
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>

            <InputBase
              sx={{ flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search..." }}
            />
          </Paper>

          <AddChartModal />
          <ChartList />
        </Stack>
      </Drawer>
    </Box>
  );
};

export default SideBar;
