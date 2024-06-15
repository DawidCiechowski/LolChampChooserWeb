import React, { useState } from "react"

export declare interface CollapsibleProps {
    children?: React.ReactNode;
}

export const Collapsible = (props: CollapsibleProps) => {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div className=" flex justify-center items-center bg-black text-white font-bold flex-col mb-4 font-Kanit">
            <button className="bg-blue-500 rounded-xl w-48 h-16 m-3 p-3 text-white flex justify-center items-center shadow-lg shadow-blue-500/60 hover:bg-blue-700 hover:shadow-blue-700/60" onClick={toggle}>Filter Champions</button>
            {open ? <div className="border-2 ease-in duration-200 border-rose-500 rounded-md w-64 h-96 overflow-y-auto" >{props.children}</div> : <div className=" h-0 ease-out duration-500 bg-black"/>}
        </div>
    )

}   