import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Box,
  IconButton,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import { matchPath, useLocation, NavLink } from "react-router";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { deleteChart } from "../redux/chartReducer";
import { Chart } from "../interfaces/chartInterface";
import EditChartModal from "./EditChartModal";

const ChartList = ({ onChartSelect, chartFilter }: { onChartSelect?: () => void, chartFilter?: string }) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState<Record<string, boolean>>({});

  const location = useLocation();
  const match = matchPath("/:chartId", location.pathname);
  const chartId = match ? decodeURIComponent(match.params.chartId ?? "") : null;

  const dispatch = useDispatch();

  const charts: Chart[] = useSelector((state: RootState) => state.charts);

  useEffect(() => {
    if (chartId) {
      setSelectedChart(chartId);
    }
  }, [chartId]);

  const onSelectChart = (name: string) => {
    setSelectedChart(name);
    onChartSelect?.();
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, name: string) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [name]: event.currentTarget,
    }));
  };

  const handleMenuClose = (name: string) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [name]: null,
    }));
  };

  const handleEdit = (name: string) => {
    setDialogOpen(prevState => ({
      ...prevState,
      [name]: true,
    }));
    handleMenuClose(name);
  };

  const handleDelete = (name: string) => {
    dispatch(deleteChart(name));
    handleMenuClose(name);
  };

  const filteredCharts = charts.filter(chart =>
    chart.name.toLowerCase().includes(chartFilter?.toLowerCase() ?? "")
  );


  return (
    <div>
      {filteredCharts ? (
        filteredCharts.map((chart: Chart) => (
          <div
            key={chart.name}
            className={
              selectedChart === chart.name ? "bg-blue-100 rounded" : ""
            }
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: { xs: "20px", md: "16px" },
                height: { xs: "58px", md: "45px" },
              }}
            >
              <NavLink
                onClick={() => onSelectChart(chart.name)}
                className="navlink ml-3"
                to={`/${chart.name}`}
              >
                {chart.name}
              </NavLink>
              <IconButton
                onClick={(event) => handleMenuOpen(event, chart.name)}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{
                  "&:hover": {
                    backgroundColor: "#ebf8ff",
                  },
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu 
              anchorEl={anchorEl[chart.name]} 
              open={Boolean(anchorEl[chart.name])} 
              onClose={() => handleMenuClose(chart.name)}>
                <MenuItem onClick={() => handleEdit(chart.name)}>
                  <ListItemIcon>
                    <ModeEditOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(chart.name)}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
            <EditChartModal dialogOpen={dialogOpen[chart.name]} setDialogOpen={(open: boolean) => setDialogOpen({...dialogOpen, [chart.name]: open})} chart={chart} />
          </div>
        ))
      ) : (
        <div>No charts found</div>
      )}
    </div>
  );
};

export default ChartList;
