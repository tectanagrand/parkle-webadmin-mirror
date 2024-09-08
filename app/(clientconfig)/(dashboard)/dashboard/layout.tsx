"use client";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  Avatar,
  IconButton,
  Button,
  Box,
  Typography,
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
import Image from "next/image";
import MamenIcon from "@/public/logo.svg";
import UserBadge from "@/app/common/UserBadge";
import SnackbarProvider from "@/app/common/toaster/SnackbarProvider";

interface AppBarProps extends MuiAppBarProps {
  open?: Boolean;
}

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop != "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
  boxShadow: "none",
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth - 110}px)`,
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
  maxHeight: "100vh",
  position: "fixed",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 1200,

  "& .MuiPaper-root": {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.dark,
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
  ...(open && {
    marginLeft: "13.5rem",
    height: "100vh",
    padding: "1rem",
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: "4rem",
    height: "100vh",
    padding: "1rem",
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
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <Image src={MamenIcon} alt="logo" width={30} height={30} />
            ) : (
              <Image src={MamenIcon} alt="logo" width={30} height={30} />
            )}
          </IconButton>
          {open && (
            <>
              <p className="text-[12pt]">
                <span className="text-primary-light text-semibold">
                  PARKING
                </span>{" "}
                <span>System</span>
              </p>
            </>
          )}
        </DrawerHeader>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
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
                    selected={pathname === item.navlink}
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
          <UserBadge open={open} />
        </Box>
      </Drawer>
      <MainPage open={open}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </MainPage>
    </div>
  );
}
