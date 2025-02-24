import React, { useEffect, useState } from "react";
import Chart from "../interfaces/chartInterface";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Data } from "../interfaces/dataInterface";
import { Box, Toolbar } from "@mui/material";
import { display, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { X } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import NotFound from "./NotFound";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddChartModal from "./AddChartModal";
import BottomBar from "./BottomBar";

const ChartElement = () => {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>();

  const [seriesData, setSeriesData] = useState<Data[]>();
  const [columnData, setColumnData] = useState<Data[]>();

  const [filteredSeriesData, setFilteredSeriesData] = useState<Data[]>();
  const [filteredDateRange, setFilteredDateRange] =
    useState<DateRange<Dayjs>>();

  const { chartId } = useParams<{ chartId: string }>();
  const dispatch = useDispatch();
  const chart = useSelector((state: RootState) =>
    state.charts.find((c) => c.name === chartId)
  );

  const data: Data = useSelector((state: RootState) => state.data.data);

  useEffect(() => {
    if (chart) {
      const dataseries = data
        .filter((item: Data) => item.name === chart?.dataseries)
        .map((item: Data) => {
          return item.dataseries;
        });

      const series = [];
      const categories = [];
      for (const item of dataseries[0]) {
        series.push(item.value);
        categories.push(item.date);
      }
      setSeriesData(series);
      setDateRange([
        dayjs(categories[0]),
        dayjs(categories[categories.length - 1]),
      ]);
      setColumnData(categories);
      setFilteredDateRange([
        dayjs(categories[0]),
        dayjs(categories[categories.length - 1]),
      ]);
      setFilteredSeriesData(series);
    }
  }, [data, chart]);

  if (!chart) {
    return <NotFound />;
  }

  const chartOptions = {
    title: {
      text: "",
    },
    xAxis: {
      categories: filteredDateRange,
      title: {
        text: chart?.x_axis_name,
        align: "middle",
        style: {
          fontSize: "14px",
        },
        offset: 50,
      },
      labels: {
        formatter: function () {
          return Highcharts.dateFormat(
            "%d/%m/%Y",
            new Date(this.value).getTime()
          );
        },
      },
      lineWidth: 1,
      gridLineWidth: 1,
      startOnTick: true,
      endOnTick: true,
    },
    yAxis: {
      title: {
        text: chart?.y_axis_name,
        align: "middle",
        style: {
          fontSize: "14px",
        },
        offset: 70,
      },
      gridLineWidth: 0,
      lineWidth: 1,
      startOnTick: true,
      endOnTick: true,
    },
    series: [
      {
        name: chart?.name,
        data: filteredSeriesData,
        type: "line",
        color: chart?.color,
        showInLegend: false,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  const handleDateRangeChange = (dateRange: DateRange<Dayjs>) => {
    const startDate = dateRange[0]?.toDate();
    const endDate = dateRange[1]?.toDate();

    const filteredCategories = columnData?.filter((date) => {
      const currentDate = new Date(date);
      return currentDate >= startDate && currentDate <= endDate;
    });

    const filteredSeries = seriesData?.slice(
      columnData?.indexOf(filteredCategories?.[0]),
      columnData?.indexOf(filteredCategories?.[filteredCategories.length - 1]) +
        1
    );

    setFilteredDateRange([
      dayjs(filteredCategories?.[0]),
      dayjs(filteredCategories?.[filteredCategories.length - 1]),
    ]);
    setFilteredSeriesData(filteredSeries);
  };

  const drawerWidth = 283;

  return (
    <Box
      className="h-full bg-white md:rounded-lg border border-gray-300 flex items-center justify-center mt-16 md:mt-0"
      sx={{
        width: { xs: "100vw", md: `calc(100vw - ${drawerWidth}px)` },
      }}
    >
      <div className="text-center space-y-2 w-screen md:w-full h-full">
        <Stack direction="column" gap={8} className="md:m-32 m-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-left flex">
              {chart?.name}
            </span>
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  slots={{ field: SingleInputDateRangeField }}
                  name="allowedRange"
                  format="DD/MM/YYYY"
                  label="Period"
                  minDate={dayjs(dateRange?.[0])}
                  maxDate={dayjs(dateRange?.[dateRange.length - 1])}
                  value={filteredDateRange}
                  onChange={handleDateRangeChange}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: <CalendarMonthIcon />,
                        sx: {
                          "& .MuiInputBase-input": {
                            fontSize: "0.875rem",
                          },
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </span>
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          <Typography paragraph>{chart?.text_description}</Typography>
        </Stack>
      </div>
      <BottomBar addChart={true}></BottomBar>
    </Box>
  );
};

export default ChartElement;
