"use client"
import SideBar from "./components/SideBar";
import { Provider } from "@/components/ui/provider";
import ChartElement from "./components/ChartElement";
import Navbar from "./components/navbar";


export default function Home() {

  return (
    <Provider>
      <Navbar />
      <div className="flex h-screen">
        <SideBar />
        <div className="md:m-4 flex-1">
          <ChartElement chart={{type:"not-selected", data:{}}} />
        </div>
      </div>
    </Provider>
  );
}
