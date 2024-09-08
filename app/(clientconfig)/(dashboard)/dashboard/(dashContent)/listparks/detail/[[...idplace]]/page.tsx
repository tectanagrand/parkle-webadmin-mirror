"use client";

import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderLayout from "@/app/common/HeaderLayout";
import ContentLayout from "@/app/common/ContentLayout";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/16/solid";
import { IconButton, Divider, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useSnackBar,
  SnackBarInterface,
} from "@/app/common/toaster/SnackbarProvider";
import TextFieldComp from "@/app/common/input/TextFieldComp";
import NumberFieldComponent from "@/app/common/input/NumberFieldComponent";
import CameraFormField from "./ui/CameraFormField";
import MapFormField from "./ui/MapFormField";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import TextFieldCoordinate from "@/app/common/input/TextFieldCoordinate";
import { isAxiosError } from "axios";
// import DrawableVideo from "./ui/DrawableVideo";

export interface ParkingsFormInterface {
  parking_name: string;
  address: string;
  price: string;
  coordinate: {
    lat: string;
    lng: string;
  };
  camera: Array<{
    camera_name: string;
    parking_spot: SpotParkingsInterface[];
  }>;
}

export interface ParkingSpotFormInterface {
  place_id: string;
  spot_name: string;
}

export interface SpotParkingsInterface {
  uuid: string;
  spot_name: string;
  spot_coor: {
    lat: string;
    lng: string;
  };
}

const error_msg = {
  required: "This field is required",
};

const ParkingsFormSchema = z.object({
  parking_name: z.string().min(1, { message: error_msg.required }),
  address: z.string().min(1, { message: error_msg.required }),
  price: z.string().min(1, { message: error_msg.required }),
  coordinate: z
    .object({
      lat: z.string(),
      lng: z.string(),
    })
    .required(),
  camera: z.array(
    z.object({
      camera_name: z.string().min(1, { message: error_msg.required }),
      parking_spot: z.array(
        z.object({
          uuid: z.string(),
          spot_name: z.string().min(1, { message: error_msg.required }),
          spot_coor: z.object({
            lat: z.string(),
            lng: z.string(),
          }),
        })
      ),
    })
  ),
});

const DetailParkings = ({ params }: { params: { idplace: string } }) => {
  const axios = useAxiosAuth();
  const defaultValues: ParkingsFormInterface = {
    parking_name: "",
    address: "",
    price: "",
    coordinate: {
      lat: "0",
      lng: "0",
    },
    camera: [
      {
        camera_name: "",
        parking_spot: [],
      },
    ],
  };
  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ParkingsFormInterface>({
    defaultValues: defaultValues,
    resolver: zodResolver(ParkingsFormSchema),
  });

  const { openSnackbar } = useSnackBar() as SnackBarInterface;

  const submitForm = async (value: ParkingsFormInterface) => {
    setLoading(true);
    try {
      const payloadPlace = {
        name: value.parking_name,
        address: value.address,
        price_per_hour: value.price.replace(/[^0-9]/g, ""),
        latitude: value.coordinate.lat,
        longitude: value.coordinate.lng,
      };
      const { data } = await axios.post("/api/place", payloadPlace);
      const id_place = data.data.id;
      let indexFloor = 0;
      for (const floor of value.camera) {
        let indexSection = 0;
        for (const section of floor.parking_spot) {
          const payloadSection = {
            place_id: id_place,
            floor_name: floor.camera_name,
            floor_order: indexFloor + 1,
            section: section.spot_name,
            spot_order: indexSection + 1,
            latitude: section.spot_coor.lat,
            longitude: section.spot_coor.lng,
          };
          const { data: place_spot } = await axios.post(
            "/api/place/spot",
            payloadSection
          );
          indexSection++;
        }
        indexFloor++;
      }
      openSnackbar("success", "Place Added");
    } catch (error: any) {
      console.error(error);
      if (isAxiosError(error)) {
        openSnackbar("error", error.response?.data.message);
      } else {
        openSnackbar("error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    fields: camera,
    append: add_camera,
    remove: remove_camera,
  } = useFieldArray({ control: control, name: "camera" });
  //ps : parking_spot

  const addCamera = () => {
    add_camera({
      camera_name: "",
      parking_spot: [
        {
          uuid: "",
          spot_name: "",
          spot_coor: {
            lat: "0",
            lng: "0",
          },
        },
      ],
    });
  };

  const [cameraIndex, setCameraIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const changeCameraOnClick = (index: number) => {
    setCameraIndex(index);
  };
  return (
    <div className="min-w-full h-fit items-center justify-center">
      <HeaderLayout className="h-fit ">
        <div className="flex gap-1 items-center">
          <IconButton sx={{ width: "30px", height: "30px" }}>
            <ArrowLeftIcon className="w-4 h-4" />
          </IconButton>
          <h4 className="font-semibold pb-1">Detail Parkings</h4>
        </div>
      </HeaderLayout>
      <ContentLayout className="h-fit">
        <div className="flex h-full w-full">
          <div className="w-full h-full p-3 ">
            <div className=" h-fit flex flex-col gap-2  ">
              <MapFormField
                control={control}
                getValues={getValues}
                watch={watch}
                index={cameraIndex}
                setValue={setValue}
              />
            </div>
          </div>
          <div className="w-full p-3">
            <HeaderLayout className="h-fit">
              <div className="flex flex-col">
                <h4>Detail Parkings</h4>
                <p>Type caption</p>
              </div>
            </HeaderLayout>
            <ContentLayout className="h-fit">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="w-full px-4 pt-2 flex flex-wrap">
                  <TextFieldComp
                    label="Parking Name *"
                    name="parking_name"
                    control={control}
                    sx={{ mt: "30px" }}
                  />
                  <TextFieldComp
                    label="Address *"
                    name="address"
                    control={control}
                    sx={{ mt: "30px" }}
                  />
                  <NumberFieldComponent
                    label="Price *"
                    name="price"
                    control={control}
                    NumFormatProps={{ thousandSeparator: true, prefix: "Rp" }}
                  />
                  <p className="font-bold text-[8pt] mt-[10px]">Coordinate *</p>
                  <div className="flex gap-3 w-full">
                    <TextFieldComp
                      label="Latitude"
                      name="coordinate.lat"
                      control={control}
                      float={true}
                      sx={{ mt: "30px" }}
                    />
                    <TextFieldComp
                      label="Longitude"
                      name="coordinate.lng"
                      control={control}
                      float={true}
                      sx={{ mt: "30px" }}
                    />
                  </div>
                  <Divider />
                  {camera.map((field, index) => {
                    return (
                      <CameraFormField
                        key={field.id}
                        control={control}
                        remove={remove_camera}
                        index={index}
                        register={register}
                        changeCameraIndex={changeCameraOnClick}
                        getValues={getValues}
                      />
                    );
                  })}
                  <div className="w-full py-4">
                    <Divider
                      textAlign="right"
                      sx={{ "::after": { width: "0" } }}
                    >
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          addCamera();
                        }}
                      >
                        <div className="flex items-center">
                          <PlusIcon className="h-4 w-4 mr-2" />{" "}
                          <p>Add Camera</p>
                        </div>
                      </Button>
                    </Divider>
                  </div>
                  <div className="flex justify-end w-full py-2">
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      type="submit"
                      loading={isLoading}
                    >
                      <h4>Submit Detail Parking Place</h4>
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </ContentLayout>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};

export default DetailParkings;
