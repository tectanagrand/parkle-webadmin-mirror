import { Controller } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import { formatCoordinate } from "@/app/helper/Formatter";

interface TextFieldCompInterface {
  name: string;
  label?: string;
  control: any;
  coordinate?: boolean;
  float?: boolean;
  sx?: SxProps;
}

const TextFieldComp = ({
  name,
  label,
  control,
  coordinate,
  float,
  ...props
}: TextFieldCompInterface) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <TextField
            value={value}
            label={label}
            onChange={(e) => {
              if (coordinate) {
                const newValue = formatCoordinate(e.target.value);
                if (!newValue && newValue !== "") return;
                onChange(newValue);
                return;
              }
              if (float) {
                const inputValue = e.target.value;
                // Regex pattern to allow signed float numbers
                const regex = /^-?\d*\.?\d*$/;
                // Check if the input value matches the regex
                if (regex.test(inputValue)) {
                  onChange(inputValue);
                } else {
                  onChange(0);
                }
                return;
              }
              onChange(e);
              return;
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

export default TextFieldComp;
