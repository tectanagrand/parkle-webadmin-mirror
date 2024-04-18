import Image from "next/image";
import FotoProfil from "@/public/fotosupir1.jpg";
import { IconButton } from "@mui/material";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function UserBadge({ open }: { open: boolean }) {
  return (
    <div className="flex items-center gap-2 p-4">
      {open && (
        <>
          <div className="relative overflow-hidden rounded-full h-8 w-8">
            <Image src={FotoProfil} alt="Foto profil" layout="fill" />
          </div>
          <div>
            <p className="text-[10pt]">John Doe</p>
            <p className="text-[6pt]">Super Admin</p>
          </div>
        </>
      )}
      <IconButton className="">
        <ArrowRightStartOnRectangleIcon
          className={clsx("w-4 h-4 text-error", open && "ml-8")}
        />
      </IconButton>
    </div>
  );
}
