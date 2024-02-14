import { styled, ToggleButton as MuiButton, Box } from "@mui/material";
import { HomeIcon } from "@heroicons/react/16/solid";
import DynamicHeroIcon from "./DynamicIcon";
import Link from "next/link";

const Menu = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? "17rem" : "4rem",
  height: "3.5rem",
  borderRadius: "25px 25px 25px 25px",
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.grey[200],
  justifyContent: "flex-start",
  paddingLeft: "1rem",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
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
      backgroundColor: theme.palette.primary.light,
    },
    backgroundColor: "#B8FFAB",
    color: theme.palette.primary.main,
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
            alignItems: "center",
            alignContent: "flex-start",
          }}
        >
          <div className="flex items-center gap-3">
            <DynamicHeroIcon icon={Icon} />
            {open && <p className="my-0">{caption}</p>}
          </div>
        </Box>
      </Menu>
    </Link>
  );
}
