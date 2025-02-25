import React, { useState} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addChart, deleteChart } from "../redux/chartReducer";
import { Entry } from "../interfaces/dataInterface";
import { RootState } from "../redux/store";
import { Chart } from "../interfaces/chartInterface";
import { useNavigate } from "react-router";

const EditChartModal = ({dialogOpen, setDialogOpen, chart}: {dialogOpen: boolean, setDialogOpen: (open: boolean) => void, chart: Chart}) => {
  
  const [dataseriesCollection, setDataseriesCollection] = useState<{ label: string; value: string; }[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Chart>();

  const dispatch = useDispatch();

  const data: Entry[] = useSelector((state: RootState) => state.data.data);
  React.useEffect(() => {
    setDataseriesCollection(
      data.map((item: Entry) => ({
        label: item.name,
        value: item.name,
      }))
    );
  }, [data]);

  const onSubmit = (data: Chart) => {
    dispatch(deleteChart(chart.name));
    dispatch(addChart(data));
    navigate("/" + data.name);
    setDialogOpen(false);
  };

  
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          <p className="font-bold">Edit Chart</p>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" className="mt-2" spacing={3}>
              <TextField
                {...register("name", { required: "Name is required" })}
                label={
                  <p>
                    Name<span style={{ color: "red" }}> *</span>
                  </p>
                }
                fullWidth
                margin="dense"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                defaultValue={chart.name}
              ></TextField>
              <FormControl fullWidth margin="dense" error={!!errors.type}>
                <InputLabel>
                  Type<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required" }}
                  defaultValue={chart.type}
                  render={({ field }) => (
                    <Select {...field} label="Type">
                      <MenuItem value="line">Line</MenuItem>
                      <MenuItem value="bar">Bar</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.type ? errors.type.message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense" error={!!errors.color}>
                <InputLabel>
                  Color<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Controller
                  name="color"
                  control={control}
                  rules={{ required: "Color is required" }}
                  defaultValue={chart.color}
                  render={({ field }) => (
                    <Select {...field} label="Color">
                      <MenuItem value="black">Black</MenuItem>
                      <MenuItem value="red">Red</MenuItem>
                      <MenuItem value="blue">Blue</MenuItem>
                      <MenuItem value="green">Green</MenuItem>
                      <MenuItem value="yellow">Yellow</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.color ? errors.color.message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense" error={!!errors.dataseries}>
                <InputLabel>
                  Dataseries<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Controller
                  name="dataseries"
                  control={control}
                  rules={{ required: "Dataseries is required" }}
                  defaultValue={chart.dataseries}
                  render={({ field }) => (
                    <Select {...field} label="Dataseries">
                      {dataseriesCollection.map((item: { label: string; value: string; }) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.dataseries ? errors.dataseries.message : ""}
                </FormHelperText>
              </FormControl>
              <Stack direction="row" spacing={2}>
                <TextField
                  {...register("x_axis_name")}
                  label="X-axis Name"
                  fullWidth
                  margin="dense"
                  defaultValue={chart.x_axis_name}
                />
                <TextField
                  {...register("y_axis_name")}
                  label="Y-axis Name"
                  fullWidth
                  margin="dense"
                  defaultValue={chart.y_axis_name}
                />
              </Stack>
              <TextField
                {...register("text_description")}
                label="Text Description"
                fullWidth
                margin="dense"
                defaultValue={chart.text_description}
              />
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Edit Chart</Button>
              </DialogActions>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
  )
}

export default EditChartModal