export interface Data {
    data: Entry[]
  }
  
export interface Entry {
    name: string;
    dataseries: Datasery[];
  }
  
export interface Datasery {
    value: number;
    date: string;
  }
