"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import "@/app/globals.css";
import { Provider } from "@/components/ui/provider";

import SideBar from "@/app/components/SideBar";
import ChartElement from "@/app/components/ChartElement";
import Navbar from '@/app/components/navbar';

interface Dataseries {
    name: string;
    dataseries: Datasery[];
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
  }

export default function ChartPage() {

    const [chart, setChart] = useState({type: "loading", data: {}})
    const [selectedChart, setSelectedChart] = useState<string | undefined>(undefined)

    const pathname = usePathname()

    
    const findDataseries = (dataArray: Dataseries[], dataseriesName: string) => {
        for (const dataseries of dataArray){
            if (dataseries.name === dataseriesName){
                return dataseries.dataseries
            }
        }
        return []
    }

    useEffect(() => {
        async function load() {

            if (pathname === null){
            
        }
        else if(pathname.startsWith('/:')){
            const decodedPath = decodeURIComponent(pathname.split('/')[1].split(':')[1]);

            const config = await getConfig()
            
            if (decodedPath in config.config.charts){
                config.config.charts[decodedPath].name = decodedPath
                const dataseries = await getData()
                config.config.charts[decodedPath].dataseries = findDataseries(dataseries.data, config.config.charts[decodedPath].dataseries)
                setChart({type: "ok", data: config.config.charts[decodedPath]})
                setSelectedChart(decodedPath)
            }
            else{
                setChart({type: "not-found", data: {}})
            }

        }
        else{
            setChart({type: "not-found", data: {}})
        }
      }
      load()
    }, [pathname])
    




    return (
        <Provider>
      <Navbar selectedChart={selectedChart} />
      <div className="flex h-screen">
        <SideBar selectedChart={selectedChart} />
        <div className="md:m-4 flex-1">
              <ChartElement chart={chart} />
              </div>
            </div>
        </Provider>
    )

}
