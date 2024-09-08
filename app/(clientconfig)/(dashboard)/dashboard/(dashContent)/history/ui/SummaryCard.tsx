const SummaryCard = () => {
  return (
    <div className="w-[16rem] h-[8rem] bg-gray-50 rounded-lg border-solid border-gray-200 border-[2px] flex-col py-2 px-4">
      <div className="flex justify-between items-center ">
        <p className="font-semibold">Total Parking</p>
        <div className="w-[4rem] h-[2rem] rounded-full border-solid border-gray-200 border-[2px] flex items-center justify-center">
          <p className="font-semibold">Today</p>
        </div>
      </div>
      <div className="">
        <h1 className="mt-2 mb-0">821 Parking</h1>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-green-500">+ 20%</p>
        <p className="font-semibold text-gray-400">Past Month</p>
      </div>
    </div>
  );
};

export default SummaryCard;
