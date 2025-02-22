
import { promises as fs } from 'fs';
import path from 'path';

interface Chart{
    type: string;
    data:object;
}

interface ChartAdd{
    name: string;
    type: string;
    color: string;
    data_series: string;
    x_axis_name: string;
    y_axis_name: string;
    text_description: string;
}

interface ChartEdit{
    index: number;
    data: ChartAdd;
}

interface ChartDelete{
    chartKey: string;
}




const defaultConfig = {
    charts: {},
};

export const readConfig = async () => {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'config.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContents);
        return data;
    } catch (error) {
        console.error(error);
        return defaultConfig;
    }
};

export const writeConfig = async (data: Chart) => {
    const filePath = path.join(process.cwd(), 'public', 'data', 'config.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};


export const editConfig = async (data: Chart) => {
    try {
        let res;
        try{
            res = await readConfig();
        } catch (error) {
            res = defaultConfig;
            console.error(error);
        }
        
        if (data.type === "add") {
            const addData = data.data as ChartAdd;
            const name = addData.name;
            delete addData.name;
            res.charts[name] = addData;
            await writeConfig(res);
            return { "status": "success" };
        } else if (data.type === "edit") {
            const editData = data.data as ChartEdit;
            res.charts[editData.index] = editData.data;
            await writeConfig(res);
            return { "status": "success" };
        } else if (data.type === "delete") {
            console.log(data)
            const deleteData = data.data as ChartDelete;
            delete res.charts[deleteData.chartKey];
            await writeConfig(res);
            return { "status": "success" };
        }
    } catch (error) {
        console.error(error);
        return { "status": "error: " + error };
    }
};
