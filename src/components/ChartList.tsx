import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Chart } from "../interfaces/chartInterface";
import {
  Box,
  Button,
  IconButton,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Menu,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
  DialogContent,
} from "@mui/material";
import { matchPath, useLocation, NavLink, useParams } from "react-router";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ContentCut } from "@mui/icons-material";

import { deleteChart } from "../redux/chartReducer";

const ChartList = ({ onChartSelect }: { onChartSelect?: () => void }) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const match = matchPath("/:chartId", location.pathname);
  const chartId = match ? decodeURIComponent(match.params.chartId) : null;

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
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (name: string) => {
    console.log(name);
  };

  const handleDelete = (name: string) => {
    dispatch(deleteChart(name));
    handleMenuClose();
  };

  return (
    <div>
      {charts ? (
        charts.map((chart) => (
          <div
            key={chart.id}
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
                onClick={handleMenuOpen}
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
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleEdit(chart.name)}>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
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
          </div>
        ))
      ) : (
        <div>No charts found</div>
      )}
    </div>
  );
};

export default ChartList;
