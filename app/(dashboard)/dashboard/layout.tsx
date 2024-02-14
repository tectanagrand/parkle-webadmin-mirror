"use client";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  Avatar,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  Bars3Icon,
} from "@heroicons/react/16/solid";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { useState } from "react";
import MenuNav from "@/app/common/MenuNav";
import NestedMenuNav from "@/app/common/NestedNav";
import { Menu } from "@/mock/Menu";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface AppBarProps extends MuiAppBarProps {
  open?: Boolean;
}

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop != "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
  boxShadow: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 20}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  color: theme.palette.background.default,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop != "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 1200,

  "& .MuiPaper-root": {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.background.default,
    borderWidth: 0,
    padding: theme.spacing(0, 1),
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  borderWidth: 0,
}));

const MainPage = styled("div", {
  shouldForwardProp: (prop) => prop != "open",
})<{ open: boolean }>(({ theme, open }) => ({
  marginTop: "5rem",
  ...(open && {
    marginLeft: "21rem",
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: "8rem",
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar position="fixed" open={open}>
        <div
          className={clsx(
            "flex items-center justify-between p-2",
            open ? "ml-[1rem]" : "ml-[0.5rem]"
          )}
        >
          <div className="flex items-center gap-4">
            {!open && (
              <IconButton onClick={handleDrawerOpen} sx={{ ml: "0.2rem" }}>
                <Bars3Icon className="h-8 w-8" />
              </IconButton>
            )}
            <Button variant="contained" className="bg-primary rounded-full p-2">
              <p className="text-neutral-50 my-0 mx-1 font-bold">P A R K L E</p>
            </Button>
            <p>{pathname}</p>
          </div>
          <Avatar />
        </div>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className="w-8 h-8" />
            ) : (
              <ChevronLeftIcon className="w-8 h-8" />
            )}
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: "1rem",
          }}
        >
          {Menu.map((item) => {
            if (item.child.length === 0) {
              return (
                <MenuNav
                  open={open}
                  caption={item.parent}
                  Icon={item.icon}
                  navlink={item.navlink}
                  key={item.id}
                  selected={pathname.split("/")[2] === item.navlink}
                />
              );
            } else {
              return (
                <NestedMenuNav
                  open={open}
                  caption={item.parent}
                  Icon={item.icon}
                  child={item.child}
                  key={item.id}
                />
              );
            }
          })}
        </Box>
      </Drawer>
      <MainPage open={open}>{children}</MainPage>
    </div>
  );
}
