import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface NumberFieldInterface {
  name: string;
  label: string;
  control: any;
  NumFormatProps: NumericFormatProps;
}

const NumberFieldComponent = ({
  name,
  label,
  control,
  NumFormatProps,
}: NumberFieldInterface) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <NumericFormat
            value={value}
            label={label}
            customInput={TextField}
            onChange={onChange}
            thousandSeparator={NumFormatProps.thousandSeparator}
            prefix={NumFormatProps.prefix}
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
            sx={{ mt: "30px" }}
            fullWidth
          />
        );
      }}
    />
  );
};

export default NumberFieldComponent;
