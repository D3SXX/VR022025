interface Data {
    data: Entry[]
  }
  
  interface Entry {
    name: string;
    dataseries: Datasery[];
  }
  
  interface Datasery {
    value: number;
    date: string;
  }

export default Data;