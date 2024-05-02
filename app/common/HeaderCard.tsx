import { ElementType } from "react"

interface HeaderCardType {
    Header? : ElementType ;
    SubHeader? : ElementType ;
    Action? : ElementType ;
}

export default function HeaderCard({Header, SubHeader, Action} : HeaderCardType) {
    return (
        <>
        <div className="rounded-t-lg border-t-[2px] border-l-[2px] border-r-[2px] border-b-0 border-slate-200 border-solid p-1 flex justify-between min-w-[100%]">
            <div className="flex flex-col gap-1">
                {Header ? <Header/> : <></>}
                {SubHeader ? <SubHeader/> : <></>}
            </div>
            <div>
                {Action ? <Action/> : <></>}
            </div>
        </div>
        </>
    ) ;
}