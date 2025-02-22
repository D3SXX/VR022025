import { promises as fs } from 'fs';
import path from 'path';

export const getJson = async (filename: string) => {
    try{
        const filePath = path.join(process.cwd(), 'public', 'data', filename);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContents);
        return data;
    } catch (error) {
        return {};
    }
}