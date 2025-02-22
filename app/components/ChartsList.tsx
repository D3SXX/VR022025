"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import Link from "next/link";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useRouter } from "next/navigation";

interface Config {
    config: {
      charts: {
        [key: string]: Chart;
      };
    };
  }
  

interface Chart {
    [key: string]: {
        x_axis_name: string;
        y_axis_name: string;
        text_description: string;
        type: string;
        color: string;
        dataseries: string;
    }
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
}

const removeData = async (chartKey: string) => {
  const res = await fetch(`/api/chartControl?chart=${chartKey}`, {
      method: "DELETE",
  })
  const data = await res.json()
  return data
}

const ChartsList = ({ selectedChart }: { selectedChart?: string }) => {
  const router = useRouter();

  const removeChart = (chartKey: string) => {
    removeData(chartKey);
    router.refresh();
  }
  console.log(selectedChart)

  const [data, setData] = useState<Chart[]>([]);
  useEffect(() => {
    async function load() {
      const configData: Config = await getConfig();
      setData(configData.config.charts);
      console.log(configData.config.charts)
    }
    load();
  }, []);

  return (
    <div>
      {data && Object.entries(data).length > 0 ? (
        Object.entries(data).map(([chartKey, chart]) => (
          <div key={chartKey}>
            <Link href={`/:${chartKey}`}>
              <Button
                variant="solid"
                id={`chart-${chartKey}`}
                className={`w-full h-14 md:h-11 text-left hover:bg-blue-100 flex justify-between items-center ${chartKey === selectedChart ? "bg-blue-100" : ""}`}
              >
                <div className="ml-4 md:ml-2 text-black">{chartKey}</div>
                <MenuRoot>
                  <MenuTrigger asChild>
                    <Button variant="outline" size="sm" className="hover:bg-blue-200 rounded-full mr-2">
                      <BsThreeDotsVertical />
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem value="new-txt"><BiSolidPencil /> Edit</MenuItem>
                    <MenuItem value="new-file" onClick={() => removeChart(chartKey)}><BiSolidTrashAlt />Delete</MenuItem>
                  </MenuContent>
                </MenuRoot>
              </Button>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-base">No charts</div>
      )}
    </div>
  );
};

export default ChartsList;
