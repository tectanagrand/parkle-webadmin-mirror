import { Controller } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import { formatCoordinate, formatLatLngGoogle } from "@/app/helper/Formatter";

interface TextFieldCompInterface {
  name: string;
  label?: string;
  control: any;
  sx?: SxProps;
}

const TextFieldCoordinate = ({
  name,
  label,
  control,
  ...props
}: TextFieldCompInterface) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <TextField
            value={`${value.lat},${value.lng}`}
            label={label}
            onChange={(e) => {
              const newValue = formatLatLngGoogle(e.target.value);
              onChange(newValue);
            }}
            inputRef={ref}
            helperText={error && error.message}
            error={!!error}
            fullWidth
            {...props}
          />
        );
      }}
    />
  );
};

export default TextFieldCoordinate;
