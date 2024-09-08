import { FC } from "react";
import {
  CameraIcon,
  TruckIcon,
  UserIcon,
  CircleStackIcon,
} from "@heroicons/react/16/solid";

const icons = {
  CameraIcon: CameraIcon,
  TruckIcon: TruckIcon,
  UserIcon: UserIcon,
  CircleStackIcon: CircleStackIcon,
};

interface DynamicHeroIconProps {
  icon: string;
}

const DynamicHeroIcon: FC<DynamicHeroIconProps> = ({ icon }) => {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <>
      <IconComponent className="h-5 w-5" aria-hidden="true" />
    </>
  );
};

export default DynamicHeroIcon;
