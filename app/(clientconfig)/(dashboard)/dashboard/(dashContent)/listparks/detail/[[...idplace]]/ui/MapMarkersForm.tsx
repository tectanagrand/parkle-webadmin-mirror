"use client";

import {
  useMap,
  AdvancedMarker,
  Pin,
  AdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Stack, Button } from "@mui/material";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ParkingsFormInterface, SpotParkingsInterface } from "../page";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  useWatch,
  useFieldArray,
  UseFieldArrayRemove,
} from "react-hook-form";
interface MapMarkersFormInterface {
  control: Control<ParkingsFormInterface>;
  getValues: UseFormGetValues<ParkingsFormInterface>;
  indexCamera: number;
  indexSpot: number;
  setMarkerRef: (marker: AdvancedMarkerRef | null, key: string) => void;
  setValue: UseFormSetValue<ParkingsFormInterface>;
}

const MapMarkersForm = ({
  control,
  getValues,
  setValue,
  indexCamera,
  indexSpot,
  setMarkerRef,
}: MapMarkersFormInterface) => {
  const map = useMap();
  const markerRef = useRef<AdvancedMarkerRef | null>(null);
  const [toggleIW, setToggleIW] = useState<{
    open: boolean;
    coor: google.maps.LatLngLiteral;
    coormarker: google.maps.LatLngLiteral;
  }>({
    open: false,
    coor: {
      lat: 0,
      lng: 0,
    },
    coormarker: {
      lat: 0.005,
      lng: 0,
    },
  });
  const watchField = useWatch({
    control: control,
    name: [
      `camera.${indexCamera}.parking_spot.${indexSpot}`,
      `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lat`,
      `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lng`,
      `camera.${indexCamera}.parking_spot.${indexSpot}.spot_name`,
      `camera.${indexCamera}.parking_spot.${indexSpot}.uuid`,
    ],
  });
  const uuid = useMemo(
    () => getValues(`camera.${indexCamera}.parking_spot.${indexSpot}.uuid`),
    [watchField]
  );
  const markerName = useMemo(
    () =>
      getValues(`camera.${indexCamera}.parking_spot.${indexSpot}.spot_name`),
    [watchField]
  );
  const onDragEndMarker = useCallback(
    (indexSpot: number, newcoor: { lat: string; lng: string }) => {
      setValue(
        `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor`,
        newcoor
      );
    },
    []
  );
  const handleClick = (ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log(ev.latLng.lat().toString());
    console.log("marker clicked: ", ev.latLng.toString());

    setToggleIW({
      open: true,
      coor: {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
      },
      coormarker: {
        lat: ev.latLng.lat() + 0.005,
        lng: ev.latLng.lng(),
      },
    });
    map.panTo(ev.latLng);
  };

  const [coor, setCoor] = useState({
    lat: isNaN(
      parseFloat(
        getValues(
          `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lat`
        )
      )
    )
      ? 0
      : parseFloat(
          getValues(
            `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lat`
          )
        ),
    lng: isNaN(
      parseFloat(
        getValues(
          `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lng`
        )
      )
    )
      ? 0
      : parseFloat(
          getValues(
            `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lng`
          )
        ),
  });

  useEffect(() => {
    const lat = isNaN(
      parseFloat(
        getValues(
          `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lat`
        )
      )
    )
      ? 0
      : parseFloat(
          getValues(
            `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lat`
          )
        );
    const lng = isNaN(
      parseFloat(
        getValues(
          `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lng`
        )
      )
    )
      ? 0
      : parseFloat(
          getValues(
            `camera.${indexCamera}.parking_spot.${indexSpot}.spot_coor.lng`
          )
        );
    setCoor({
      lat: lat,
      lng: lng,
    });
  }, [watchField]);

  return (
    <>
      {toggleIW.open && (
        <InfoWindow
          anchor={markerRef.current}
          onClose={() => {
            setToggleIW((prev) => ({
              ...prev,
              open: false,
            }));
          }}
        >
          <Stack>
            <h3 className="my-0">{markerName}</h3>
            <div className="mb-2">{`Position : ${toggleIW.coor.lat} , ${toggleIW.coor.lng}`}</div>
          </Stack>
        </InfoWindow>
      )}
      <AdvancedMarker
        position={coor}
        clickable={true}
        onClick={handleClick}
        draggable
        onDragEnd={(e: google.maps.MapMouseEvent) => {
          const position = markerRef.current?.position;
          if (position) {
            const newCoor = {
              lat: position.lat.toString() ?? "0",
              lng: position.lng.toString() ?? "0",
            };
            console.log(newCoor);
            onDragEndMarker(indexSpot, newCoor);
          }
        }}
        ref={(marker) => {
          markerRef.current = marker;
          if (marker) {
            setMarkerRef(marker, uuid);
          }
        }}
      >
        <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>
    </>
  );
};

export default MapMarkersForm;
