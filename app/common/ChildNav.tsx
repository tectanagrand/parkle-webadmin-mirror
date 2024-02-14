import { styled, Button as MuiButton, Box } from "@mui/material";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const Menu = styled(MuiButton)(({ theme }) => ({
  width: "13rem",
  height: "2.5rem",
  marginLeft: "4rem",
  borderRadius: "25px 25px 25px 25px",
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.grey[200],
  display: "flex",
  alignContent: "space-between",
  paddingLeft: "1rem",
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

interface MenuNavProps {
  menu: string;
  link: string;
}

export default function ChildNav({ menu, link }: MenuNavProps) {
  return (
    <Link href={link}>
      <Menu>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "flex-start",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <div className="flex items-center gap-3">
            <p className="">{menu}</p>
          </div>
        </Box>
      </Menu>
    </Link>
  );
}
