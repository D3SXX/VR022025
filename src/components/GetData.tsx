import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/dataReducer";

const GetData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/dataseries.json");
      const data = await res.json();
      setLoading(false);
      console.log(data);
      dispatch(setData({ data }));
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
      {loading && (
        <div>
          <LinearProgress />
        </div>
      )}
    </Box>
  );
};

export default GetData;
