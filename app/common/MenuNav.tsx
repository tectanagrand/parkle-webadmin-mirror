import { styled, ToggleButton as MuiButton, Box } from "@mui/material";
import { HomeIcon } from "@heroicons/react/16/solid";
import DynamicHeroIcon from "./DynamicIcon";
import Link from "next/link";

const Menu = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? "12rem" : "3rem",
  height: "3rem",
  borderRadius: "8px ",
  borderWidth: "0px",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.primary.contrastText,
  justifyContent: "flex-start",
  paddingLeft: "0.8rem",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
  "&:focus": {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    backgroundColor: "#B8FFAB",
    color: theme.palette.primary.main,
  },
  "&.Mui-selected": {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

interface MenuNavProps {
  open: boolean;
  Icon: string;
  caption: string;
  navlink: string;
  selected: boolean;
}

export default function MenuNav({
  open,
  Icon,
  caption,
  navlink,
  selected,
}: MenuNavProps) {
  return (
    <Link href={navlink}>
      <Menu value="menu" selected={selected} open={open}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            ml: "0.2rem",
            alignItems: "center",
            alignContent: "flex-start",
          }}
        >
          <div className="flex items-center gap-3">
            <DynamicHeroIcon icon={Icon} />
            {open && <p className="my-0 capitalize font-medium">{caption}</p>}
          </div>
        </Box>
      </Menu>
    </Link>
  );
}
