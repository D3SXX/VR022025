import { Box, Button } from "@mui/material";
import { NavLink } from "react-router";
import BottomBar from "./BottomBar";

const drawerWidth = 283;

const NotFound = () => {
  return (
    <Box
      className="h-full bg-white md:rounded-lg border border-gray-300 flex items-center justify-center"
      sx={{
        width: { xs: "100vw", md: `calc(100vw - ${drawerWidth}px)` },
      }}
    >
      <div className="flex flex-col items-center justify-center h-full m-4 md:m-0">
        <span className="text-blue-500 text-[120px] md:text-[220px] font-bold">
          404
        </span>
        <span className="text-black text-md md:text-2xl font-bold -mt-6 md:-mt-12">
          Page not found. Please try again later.
        </span>
        <NavLink to="/">
          <Button
            size="large"
            sx={{
              mt: 4,
              width: { xs: "calc(100vw - 32px)", md: "auto" },
              mx: { xs: 2, md: 0 },
              position: { xs: "fixed", md: "static" },
              bottom: { xs: 12, md: "auto" },
              left: { xs: 0, md: "auto" },
            }}
            variant="contained"
          >
            Go home
          </Button>
        </NavLink>
      </div>
      <BottomBar addChart={false}></BottomBar>
    </Box>
  );
};

export default NotFound;
