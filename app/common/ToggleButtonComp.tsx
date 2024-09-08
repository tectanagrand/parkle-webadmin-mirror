import {
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ToggleButtonCompInterface {
  toggleButton: Array<{
    text: string;
    value: string;
  }>;
  value: string;
  sxBg?: SxProps;
  sxBtn?: SxProps;
  setValue: (value: string) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.8),
    border: 0,
    borderRadius: "10px",
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
    [`&.${toggleButtonGroupClasses.selected}`]: {
      backgroundColor: theme.palette.background.default,
      boxShadow: `0px 0px 2px 2px ${"rgb(229 231 235 / var(--tw-border-opacity))"}`,
      borderColor: "rgb(229 231 235 / var(--tw-border-opacity))",
    },
  },
  backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "rgb(229 231 235 / var(--tw-border-opacity))",
  height: "40px",
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));

const ToggleButtonComp = ({
  toggleButton,
  value,
  setValue,
  sxBg,
  sxBtn,
}: ToggleButtonCompInterface) => {
  return (
    <StyledToggleButtonGroup
      size="small"
      value={value}
      onChange={(e, value) => setValue(value)}
      exclusive
      sx={sxBg}
    >
      {toggleButton.map((item) => (
        <ToggleButton value={item.value} sx={{ ...sxBtn, py: "3px" }}>
          <p className="font-semibold">{item.text}</p>
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtonComp;
