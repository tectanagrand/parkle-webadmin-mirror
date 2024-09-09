import {
  Map,
  useMap,
  AdvancedMarkerRef,
  InfoWindow,
  MapMouseEvent,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import MapMarkersForm from "./MapMarkersForm";
import {
  Control,
  useFieldArray,
  useWatch,
  UseFormGetValues,
  UseFormWatch,
  UseFieldArrayAppend,
  UseFormSetValue,
} from "react-hook-form";
import { ParkingsFormInterface } from "../page";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@mui/material";
import { v4 } from "uuid";

interface MapFormFieldInterface {
  control: Control<ParkingsFormInterface>;
  index: number;
  getValues: UseFormGetValues<ParkingsFormInterface>;
  watch: UseFormWatch<ParkingsFormInterface>;
  setValue: UseFormSetValue<ParkingsFormInterface>;
}

const MapFormField = ({
  control,
  index,
  getValues,
  watch,
  setValue,
}: MapFormFieldInterface) => {
  const mapLoaded = useApiIsLoaded();

  const { append } = useFieldArray({
    control: control,
    name: `camera.${index}.parking_spot`,
  });
  const center = useMemo(
    () => ({
      lat: parseFloat(getValues("coordinate.lat")),
      lng: parseFloat(getValues("coordinate.lng")),
    }),
    []
  );
  const map = useMap();
  useEffect(() => {
    const lat = parseFloat(getValues("coordinate.lat"));
    const lng = parseFloat(getValues("coordinate.lng"));
    map?.panTo({
      lat: isNaN(lat) ? 0 : lat,
      lng: isNaN(lng) ? 0 : lng,
    });
  }, [watch("coordinate.lat"), watch("coordinate.lng")]);
  const [markers, setMarkers] = useState<{
    [index: number]: { [key: string]: AdvancedMarkerRef };
  }>({});

  const parks_spot = useMemo(
    () => getValues(`camera.${index}.parking_spot`),
    [watch(`camera.${index}.parking_spot`)]
  );

  const setMarkerRef = (marker: AdvancedMarkerRef | null, key: string) => {
    // console.log(marker);
    // console.log(key);
    // console.log(markers[index][key]);
    if (markers[index]) {
      const markerKeyData = markers[index][key];
      if (marker && markerKeyData) {
        if (marker.position == markerKeyData.position) return;
        // console.log("no change markers");
      }
      if (!marker && !markerKeyData) return;
    }
    // console.log(markers[index][key]);

    setMarkers((prev) => {
      if (marker) {
        return {
          ...prev,
          [index]: {
            ...prev[index],
            [key]: marker,
          },
        };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[index][key];
        return newMarkers;
      }
    });
  };

  const cluster = useRef<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    if (!markers[index]) return;
    if (!(Object.values(markers[index])?.length > 0)) return;
    let cleaned = true;
    //clean up current markers
    const uuid_parkspot = parks_spot.map((item) => item.uuid);
    let temp_markers = { ...markers[index] };
    Object.keys(temp_markers).map((item) => {
      if (!uuid_parkspot.includes(item)) {
        cleaned = false;
        delete temp_markers[item];
        return;
      }
    });

    if (!cleaned) {
      setMarkers((prev) => ({
        ...prev,
        [index]: temp_markers,
      }));
      return;
    }
    cluster.current = new google.maps.LatLngBounds();

    Object.values(markers[index]).map((item) => {
      if (item?.position) {
        // console.log(item?.position);
        cluster.current?.extend(item?.position);
      }
    });
    map?.fitBounds(cluster.current, 100);
    google.maps.event.addListenerOnce(
      map as google.maps.Map,
      "bounds_changed",
      function () {
        map?.setZoom(Math.min(map?.getZoom() ?? 0, 20));
      }
    );
    // console.log("map fit to bounds");
  }, [markers, index]);

  const [toggleIW, setToggleIW] = useState<{
    open?: boolean;
    coor: google.maps.LatLngLiteral | null;
  }>({
    open: false,
    coor: {
      lat: 0,
      lng: 0,
    },
  });

  return (
    <div className="w-full h-fit rounded-[20px] overflow-hidden bg-slate-200 relative">
      <div className="top-[0px] right-[0px] p-2 h-8 bg-secondary rounded-tr-lg rounded-bl-lg z-10 absolute">
        <p className="text-secondary-contrasttext">{`Floor ${index + 1}`}</p>
      </div>
      <Map
        defaultCenter={center}
        defaultZoom={10}
        style={{ height: "300px", width: "100%", borderRadius: "20px" }}
        mapId={`map-${index}`}
        onClick={(ev: MapMouseEvent) => {
          setToggleIW({
            open: true,
            coor: ev.detail.latLng,
          });
        }}
      >
        {toggleIW?.open && (
          <InfoWindow
            position={toggleIW.coor}
            onClose={() => {
              console.log("close IW");
              setToggleIW((prev) => ({
                ...prev,
                open: false,
              }));
            }}
            onCloseClick={() => {
              setToggleIW((prev) => ({
                ...prev,
                open: false,
              }));
            }}
          >
            <div className="border-slate-200 border-[1px] border-solid rounded-xl flex gap-2">
              <Button
                variant="contained"
                onClick={() => {
                  append({
                    uuid: v4(),
                    spot_name: "",
                    spot_coor: {
                      lat: `${toggleIW.coor?.lat}`,
                      lng: `${toggleIW.coor?.lng}`,
                    },
                  });
                  setToggleIW((prev) => ({
                    ...prev,
                    open: false,
                  }));
                }}
              >
                Add Section
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setValue("coordinate", {
                    lat: `${toggleIW.coor?.lat}`,
                    lng: `${toggleIW.coor?.lng}`,
                  });
                  setToggleIW((prev) => ({
                    ...prev,
                    open: false,
                  }));
                }}
              >
                Update Place Coordinate
              </Button>
            </div>
          </InfoWindow>
        )}

        {parks_spot &&
          parks_spot.map((field, indexSpot) => {
            return (
              <MapMarkersForm
                key={field.uuid}
                control={control}
                indexCamera={index}
                indexSpot={indexSpot}
                getValues={getValues}
                setMarkerRef={setMarkerRef}
                setValue={setValue}
              />
            );
          })}
      </Map>
    </div>
  );
};

export default MapFormField;
