import { editConfig } from "@/helpers/config";
import { getJson } from "@/helpers/getJson";
import { spawn } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const data = await getJson("dataseries.json");
    const config = await getJson("config.json");
    

    if (req.method === "GET") {
        const query = req.query["query"];
        if (query === undefined){
            return res.status(200).json({data: data, config: config});
        }
        if (query === "config") {
            return res.status(200).json({config: config});
        } else if (query === "data") {
            return res.status(200).json({data: data});
        }
        else{
            return res.status(400).json({status: "Invalid query"});
        }
        
    }
    if (req.method === "POST") {
        const body = req.body;
        try{
            const data = JSON.parse(body);
            const response = await editConfig(data);
            return res.status(200).json({message: response});
        } catch (error) {
            console.error(error);
            return res.status(400).json({status: "Invalid json!"});
        }
    } else if (req.method === "DELETE") {
        const chart = req.query["chart"];
        try{
            const response = await editConfig({type: "delete", data: {chartKey: chart}});
            return res.status(200).json({message: response});
        } catch (error) {
            console.error(error);
            return res.status(400).json({status: "Invalid key!"});
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}