"use client";

import {
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
  Paper,
  Button,
  Popover,
  IconButton,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

interface MenuItemInterface {
  icon: string;
  menutext: string;
  onClickAction: (idRow: string) => void;
}

interface ActionMenuItemInterface {
  sx?: SxProps<Theme>;
  menuitems: Array<MenuItemInterface>;
  id: string;
}

const icons = {
  Edit: PencilSquareIcon,
  Delete: TrashIcon,
};
const ActionsMenu = ({ sx, menuitems, id }: ActionMenuItemInterface) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const handleCloseActionMenu = () => {
    setOpenMenu(false);
  };
  return (
    <div>
      <IconButton
        onClick={(e) => {
          setOpenMenu(true);
          setAnchorEl(e.currentTarget);
        }}
        disableRipple={true}
      >
        <EllipsisVerticalIcon className="w-4 h-4" />
      </IconButton>
      <Popover
        open={openMenu}
        anchorEl={anchorEl}
        onClose={handleCloseActionMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Paper>
          <MenuList>
            {menuitems.map((item, index) => {
              const IconComponent = icons[item.icon as keyof typeof icons];
              return (
                <MenuItem
                  onClick={(e) => {
                    item.onClickAction(id);
                  }}
                  key={`${item.menutext}-${index}`}
                >
                  <ListItemIcon>
                    <IconComponent
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <p className="text-white">{item.menutext}</p>
                  </ListItemText>
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default ActionsMenu;
