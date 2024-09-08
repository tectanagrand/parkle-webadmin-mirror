import { createColumnHelper, defaultColumnSizing } from "@tanstack/react-table";
import TextFieldComp from "@/app/common/input/TextFieldComp";
import {
  useFieldArray,
  UseFormRegister,
  Control,
  useWatch,
  UseFormGetValues,
  UseFieldArrayRemove,
  UseFormWatch,
} from "react-hook-form";
import { useEffect, useMemo } from "react";
import ActionsMenu from "@/app/common/ActionsMenu";
import TableTemplate from "@/app/common/TableTemplate";
import { Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ParkingsFormInterface } from "../page";
import { SpotParkingsInterface } from "../page";

interface CameraFormFieldInterface {
  control: Control<ParkingsFormInterface>;
  index: number;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<ParkingsFormInterface>;
  getValues: UseFormGetValues<ParkingsFormInterface>;
  changeCameraIndex: (value: number) => void;
}

const CameraFormField = ({
  control,
  index,
  remove,
  register,
  changeCameraIndex,
  getValues,
  ...props
}: CameraFormFieldInterface) => {
  const theme = useTheme();
  const watchParkingSpot = useWatch({
    control: control,
    name: [`camera.${index}.parking_spot`],
  });
  const { remove: remove_spot } = useFieldArray({
    control: control,
    name: `camera.${index}.parking_spot`,
  });
  const columnHelper = createColumnHelper<SpotParkingsInterface>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "Number",
        cell: ({ row }) => row.index,
        size: 5,
      }),
      columnHelper.accessor("spot_name", {
        header: "Section Name",
        cell: ({ getValue, row }) => {
          return (
            <TextFieldComp
              name={`camera.${index}.parking_spot.${row.index}.spot_name`}
              control={control}
            />
          );
        },
        size: 40,
      }),
      columnHelper.accessor("spot_coor.lat", {
        header: "Lat.",
        cell: ({ getValue, row }) => {
          return (
            <TextFieldComp
              name={`camera.${index}.parking_spot.${row.index}.spot_coor.lat`}
              control={control}
            />
          );
        },
        size: 20,
      }),
      columnHelper.accessor("spot_coor.lng", {
        header: "Lng.",
        cell: ({ getValue, row }) => {
          return (
            <TextFieldComp
              name={`camera.${index}.parking_spot.${row.index}.spot_coor.lng`}
              control={control}
            />
          );
        },
        size: 20,
      }),
      columnHelper.display({
        id: "actions",
        header: "ACTION",
        cell: ({ row }) => {
          const ActionsItemList = [
            {
              icon: "Delete",
              menutext: "Delete",
              onClickAction: () => {
                console.log(row.index);
                console.log("delete clicked");
                remove_spot(row.index);
              },
            },
          ];

          return <ActionsMenu menuitems={ActionsItemList} id={row.id} />;
        },
        size: 5,
      }),
    ],
    []
  );

  const rowsData = useMemo(
    () => getValues(`camera.${index}.parking_spot`),
    [watchParkingSpot]
  );
  return (
    <div
      className="w-full p-3 border-slate-200 border-solid border-[1px] rounded-md mt-2"
      // onClick={(e) => {
      //   console.log(`Camera ${index + 1} form is clicked`);
      //   changeCameraIndex(index);
      // }}
    >
      <div className="flex w-full justify-between items-center">
        <h3 style={{ marginTop: "10px" }}>{`Floor ${index + 1}`}</h3>
        {index !== 0 && (
          <Button
            onClick={(e) => {
              remove(index);
            }}
            variant="outlined"
            color={"error"}
            sx={{ height: "2rem" }}
          >
            <p>Delete Floor</p>
          </Button>
        )}
      </div>
      <TextFieldComp
        name={`camera.${index}.camera_name`}
        label="Floor Name"
        control={control}
        sx={{ mt: "30px" }}
      />
      <div className="w-full mt-2">
        <TableTemplate
          {...register(`camera.${index}.parking_spot` as const)}
          rows={rowsData}
          columns={columns}
          sx={{
            borderRadius: "10px",
            borderWidth: "1px",
            borderColor: theme.palette.grey[400],
            borderStyle: "solid",
          }}
        />
      </div>
    </div>
  );
};

export default CameraFormField;
