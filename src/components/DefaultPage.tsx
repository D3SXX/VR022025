import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import AddChartModal from "./AddChartModal";
const DefaultPage = () => {
  const drawerWidth = 283;

  return (
    <Box
      className="h-full bg-white md:rounded-lg border border-gray-300 flex items-center justify-center"
      sx={{
        width: { xs: "100vw", md: `calc(100vw - ${drawerWidth}px)` },
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl font-bold text-left flex">
          No charts created yet.
        </p>
        <p className="mt-6">
          <AddChartModal />
        </p>
      </div>
    </Box>
  );
};

export default DefaultPage;
