export const Menu = [
  {
    id: "1",
    parent: "Monitoring",
    icon: "CameraIcon",
    navlink: "monitoring",
    child: [],
  },
  {
    id: "2",
    parent: "Parking",
    icon: "TruckIcon",
    navlink: "parking",
    child: [],
  },
  {
    id: "3",
    parent: "Users",
    icon: "UserIcon",
    navlink: "users",
    child: [{ id: "3-1", menu: "Active User", link: "dashboard/users/active" }],
  },
];
