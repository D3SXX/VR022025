import React, { useState } from "react";

import {
  Box,
  Button,
  createListCollection,
  defineStyle,
  Field,
  Input,
} from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Chart{
  name: string;
  type: string;
  color: string;
  dataseries: string;
  x_axis_name: string;
  y_axis_name: string;
  text_description: string;
}

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


import { Controller, useForm } from "react-hook-form";
import { z } from "zod"
import { useRouter } from "next/navigation";

const sendConfig = async (config: Chart, type: string) => {
  config.type = config.type[0]
  config.color = config.color[0]
  config.dataseries = config.dataseries[0]
  console.log(config)
  const res = await fetch("/api/chartControl", {
      method: "POST",
      body: JSON.stringify({data: config, type: type})
  })
  const data = await res.json()
  return data
}

const getData = async () => {
  try{


  const res = await fetch("/api/chartControl?query=data")
  const data = await res.json()
  dataseriesCollection.items = data.data.map((item: Entry) => ({
    label: item.name,
    value: item.name
  }))
  return data
  } catch (error) {
    return [];
  }
}

type FormValues = z.infer<typeof formSchema>

const AddChartModal = () => {
  getData()

  const router = useRouter()
  
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => {
    sendConfig(data, "add")
    setDialogOpen(false)
    router.refresh()
  })

  return (
    <DialogRoot open={dialogOpen} onOpenChange={(e) => setDialogOpen(e.open)}>
      <DialogTrigger asChild>
        <div className="w-full">
          <Button
            size="md"
            colorPalette="blue"
            color={"white"}
            bg={{ base: "colorPalette.700", _hover: "colorPalette.800" }}
            className="w-full"
            onClick={() => getData()}
          >
            <div className="flex items-center justify-center">
              <span className="text-2xl">&#43;</span>
              <span className="ml-2">ADD CHART</span>
            </div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Chart</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
        <DialogBody className="flex flex-col space-y-4">
          
          <Field.Root>
            <Box
              pos="relative"
              w="full"
              border="1px solid lightgray"
              borderRadius="md"
            >
              <Input {...register("name", {required: "Name is required"})} pl="3" className="peer" placeholder="" />
              <Field.Label css={floatingStyles}>
                Name<span style={{ color: "red" }}> *</span>
              </Field.Label>
            </Box>
            {errors.name && <span className="ml-2 text-red-500">{errors.name.message}</span>}
          </Field.Root>
          <Field.Root>
          <Controller
              control={control}
              name="type"
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  variant="outline"
                  border="1px solid lightgray"
                  borderRadius="md"
                  collection={typeCollection}
                >
                  <SelectLabel css={floatingStyles} className="text-gray-500">
                    Type <span style={{ color: "red" }}> *</span>
                  </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText className="ml-3"></SelectValueText>
                  </SelectTrigger>
                  <SelectContent style={{ zIndex: 9999 }}>
                    {typeCollection.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
            {errors.type && <span className="ml-2 text-red-500">{errors.type.message}</span>}
          </Field.Root>
          <Field.Root >
            <Controller
              control={control}
              name="color"
              rules={{ required: "Color name is required" }}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  variant="outline"
                  border="1px solid lightgray"
                  borderRadius="md"
                  collection={colorCollection}
                >
                  <SelectLabel css={floatingStyles} className="text-gray-500">
                    Color <span style={{ color: "red" }}> *</span>
                  </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText className="ml-3" />
                  </SelectTrigger>
                  <SelectContent style={{ zIndex: 9999 }}>
                    {colorCollection.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
            {errors.color && <span className="ml-2 text-red-500">{errors.color.message}</span>}
          </Field.Root>
          <Field.Root>
            <Controller
              control={control}
              name="dataseries"
              rules={{ required: "Dataseries name is required" }}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  variant="outline"
                  border="1px solid lightgray"
                  borderRadius="md"
                  collection={dataseriesCollection}
                >
                  <SelectLabel css={floatingStyles} className="text-gray-500">
                    Dataseries <span style={{ color: "red" }}> *</span>
                  </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText className="ml-3" />
                  </SelectTrigger>
                  <SelectContent style={{ zIndex: 9999 }}>
                    {dataseriesCollection.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
            {errors.dataseries && <span className="ml-2 text-red-500">{errors.dataseries.message}</span>}
          </Field.Root>
          <div className="flex flex-row gap-2">
          <Field.Root>
            <Box
              pos="relative"
              w="full"
              border="1px solid lightgray"
              borderRadius="md"
            >
              <Input {...register("x_axis_name", {required: false})} pl="3" className="peer" placeholder="" />
              <Field.Label css={floatingStyles}>
                X-axis name
              </Field.Label>
            </Box>
          </Field.Root>
          <Field.Root>
            <Box
              pos="relative"
              w="full"
              border="1px solid lightgray"
              borderRadius="md"
            >
              <Input {...register("y_axis_name", {required: false})} pl="3" className="peer" placeholder="" />
              <Field.Label css={floatingStyles}>
                Y-axis name
              </Field.Label>
            </Box>
          </Field.Root>
          </div>
          <Field.Root>
            <Box
              pos="relative"
              w="full"
              border="1px solid lightgray"
              borderRadius="md"
            >
              <Input {...register("text_description", {required: false})} pl="3" className="peer" placeholder="" />
              <Field.Label css={floatingStyles}>
                Text description
              </Field.Label>
            </Box>
          </Field.Root>
          
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">CANCEL</Button>
          </DialogActionTrigger>
          <Button className="font-bold" color="blue.500" type="submit">ADD CHART</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

const typeCollection = createListCollection({
  items: [
    {
      label: "Line",
      value: "line",
    },
    {
      label: "Bar",
      value: "bar",
    },
  ],
});

const colorCollection = createListCollection({
    items: [
      {
        label: "Black",
        value: "black",
      },
      {
        label: "Red",
        value: "red",
      },
      {
        label: "Blue",
        value: "blue",
      },
      {
        label: "Green",
        value: "green",
      },
      {
        label: "Yellow",
        value: "yellow",
      },
    ],
  });

const dataseriesCollection = createListCollection({
    items: [
      {
        label: "Dataseries",
        value: "dataseries",
      },
    ],
  });

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
export default AddChartModal;
