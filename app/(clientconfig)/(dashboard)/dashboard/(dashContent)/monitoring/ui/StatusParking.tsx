import ContentCard from "@/app/common/ContentCard";
import HeaderCard from "@/app/common/HeaderCard";
import TableStatusParking from "@/app/common/TableStatusParking";

function HeaderComponent() {
  return (
    <div className="p-1">
      <h4>Status Parking</h4>
    </div>
  );
}

function StatusParking() {
  return (
    <div className="h-[50%]">
      <HeaderCard Header={HeaderComponent} />
      <ContentCard Content={TableStatusParking} />
    </div>
  );
}

export default StatusParking;
