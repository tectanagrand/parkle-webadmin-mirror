
interface ThumbnailType {
    label : string ;
}

function ThumbnailCard({label} : ThumbnailType) {
  return (
    <div className="w-[14rem] h-[8rem] border-[2px] border-slate-500 border-solid rounded-lg">
        <div className="z-[2000] flex justify-end m-[-2px]">
        <div className="max-w-fit p-2 h-8 bg-secondary rounded-tr-lg rounded-bl-lg"><p className="text-secondary-contrasttext">{label}</p></div>
        </div>
        
    </div>
  )
}

export default ThumbnailCard
