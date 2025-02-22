"use client";
import React, { useState, useEffect, useContext } from "react";
import AddChartModal from "./AddChartModal";
import { Box, defineStyle, Field, Stack } from "@chakra-ui/react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianAxis,
  Label,
} from "recharts";
import DatePicker from "react-datepicker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Button } from "@/components/shadcn/ui/button";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import Link from "next/link";
import ChartsList from "./ChartsList";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

interface RootObject {
  chart: {
    type: string;
    data: {
      name: string;
      type: string;
      color: string;
      data_series: Datasery[];
      x_axis_name: string;
      y_axis_name: string;
      text_description: string;
      dataseries: Datasery[];
    };
  };
}

interface Datasery {
  value: number;
  date: string;
}

const getConfig = async () => {
  const res = await fetch("/api/chartControl?query=config");
  const data = await res.json();
  return data;
};

const getData = async () => {
  const res = await fetch("/api/chartControl?query=data");
  const data = await res.json();
  return data;
};

const ChartElement = (chart: RootObject) => {

  const [dataseries, setDataseries] = useState<Datasery[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [type, setType] = useState<string>("");
  
  useEffect(() => {
    if (chart.chart.type === "ok") {
      setDateRange({
        from: new Date(chart.chart.data.dataseries[0].date),
        to: new Date(
          chart.chart.data.dataseries[chart.chart.data.dataseries.length - 1].date
        ),
      });
      setType("ok");
      setDataseries(chart.chart.data.dataseries);
    }
    else if (chart.chart.type === "not-selected") {
      getConfig().then(data => {
        if (Object.keys(data.config).length === 0) {
          chart.chart.type = "empty";
          setType("empty");
        }
        else {
          setType("not-selected");
        }
      });
    }
  }, [chart]);

  useEffect(() => {
    if (dateRange) {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);

      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);

      const newDataseries = chart.chart.data.dataseries
      .filter(item => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate >= fromDate && itemDate <= toDate;
      })
      .map(item => ({
        ...item,
        date: format(new Date(item.date), "dd/MM/yyyy"),
      }));
  
      setDataseries(newDataseries);
    }
  }, [dateRange, chart.chart.data.dataseries]);

  return (
    <div className="w-full h-full bg-white md:rounded-lg border flex items-center justify-center">
      {type === "ok" ? (
        <div className="text-center space-y-2 w-screen md:w-full h-full">
          <Stack direction="column" gap={8} className="md:m-32 m-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-left flex">
                {chart.chart.data.name}
              </span>
              <div className="items-center justify-end">
              <Box pos="relative" w="full">
              <Field.Root>
                    <Field.Label className="text-xs text-gray-500 ml-1 mt-1" css={floatingStyles}>
                      Period
                    </Field.Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[250px] justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  </Field.Root>
                </Box>
              </div>
            </div>
            <div className="relative">
            <div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-black font-bold text-lg"
              style={{ transformOrigin: 'left center' }}
            >
              {chart.chart.data.y_axis_name}
            </div>
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={350}
                minHeight={350}
              >
                <LineChart data={dataseries}>
                  <Line
                    type="linear"
                    dot={false}
                    dataKey="value"
                    stroke="#8884d8"
                    legendType="none"
                    strokeWidth={3}
                  />
                  <CartesianGrid horizontal={false}  />
                  <XAxis dataKey="date" interval={0} className="text-xs" >
                      
                  </XAxis>
                  <YAxis dataKey="value">
                  </YAxis>

                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
              <div className="t text-black font-bold text-lg">{chart.chart.data.x_axis_name}</div>
            </div>
            <div className="-mt-2">{chart.chart.data.text_description}</div>
          </Stack>
        </div>
      ) : type === "not-found" ? (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-blue-500 text-[220px] font-bold">404</span>
          <span className="text-black text-2xl font-bold -mt-12">Page not found. Please try again later.</span>
          <Link href="/" className="text-blue-500 text-lg font-bold mt-4"><Button className="bg-blue-500 text-white">Go back to home</Button></Link>
          </div>
      ) : type === "empty" ? (
        <div className="flex flex-col items-center justify-center h-full">
           
          <div className="text-2xl font-bold mb-4">No charts created yet.</div>
          <div className="mt-4 flex w-3/4"><AddChartModal /></div>
          
        </div>
      ) :  (
        <div></div>
      )}
    </div>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});

export default ChartElement;
