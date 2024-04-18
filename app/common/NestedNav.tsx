import {
  styled,
  Button as MuiButton,
  Box,
  Menu as PopUpMenu,
  MenuItem,
} from "@mui/material";
import {
  HomeIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import DynamicHeroIcon from "./DynamicIcon";
import ChildNav from "./ChildNav";
import { useState } from "react";

const Menu = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? "17rem" : "4rem",
  height: "3.5rem",
  borderRadius: "25px 25px 25px 25px",
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.grey[200],
  display: "flex",
  alignContent: "space-between",
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
}));

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? "17rem" : "4rem",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface MenuNavProps {
  open: boolean;
  Icon: string;
  caption: string;
  child?: Array<{
    id: string;
    menu: string;
    link: string;
  }>;
}

export default function NestedMenuNav({
  open,
  Icon,
  caption,
  child,
}: MenuNavProps) {
  const [childOpen, setOpen] = useState(false);
  const [anchorEl, setAnchor] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const PopUpClose = () => {
    setSubOpen(false);
  };

  const PopUpOpen = () => {
    setSubOpen(true);
  };

  const OpenMenu = menuOpen || subOpen;

  return (
    <>
      <StyledBox open={open} sx={{ display: "flex", flexDirection: "column" }}>
        <Menu
          open={open}
          onClick={() => {
            setOpen(!childOpen);
          }}
          onMouseOver={(e) => {
            setMenuOpen(true);
            setAnchor(e.currentTarget);
          }}
          onMouseLeave={(e) => {
            setTimeout(() => {
              setMenuOpen(false);
            }, 100);
          }}
          aria-haspopup="true"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "flex-start",
              justifyContent: "space-between",
              flexGrow: 1,
              ...(open && {
                gap: 1,
              }),
            }}
            className="pointer-events-none"
          >
            <div className="flex items-center gap-3 pointer-events-none">
              <DynamicHeroIcon icon={Icon} />
              {open && (
                <p className="pointer-events-none capitalize">{caption}</p>
              )}
            </div>
            {open && !childOpen && (
              <ChevronRightIcon className="h-8 w-8 pointer-events-none" />
            )}
            {open && childOpen && (
              <ChevronDownIcon className="h-8 w-8 pointer-events-none" />
            )}
            {!open && (
              <ChevronRightIcon className="h-4 w-4 pointer-events-none" />
            )}
          </Box>
        </Menu>
        {open && childOpen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              my: 1,
            }}
          >
            {child?.map((item) => {
              return (
                <ChildNav key={item.id} menu={item.menu} link={item.link} />
              );
            })}
          </Box>
        )}
      </StyledBox>
      {!open && (
        <PopUpMenu
          anchorEl={anchorEl}
          open={OpenMenu}
          MenuListProps={{
            onMouseLeave: PopUpClose,
            onMouseOver: PopUpOpen,
          }}
          anchorOrigin={{ horizontal: 85, vertical: -10 }}
          sx={{ zIndex: 1199 }}
        >
          {child?.map((item) => {
            return <MenuItem key={item.id}>{item.menu}</MenuItem>;
          })}
        </PopUpMenu>
      )}
    </>
  );
}
