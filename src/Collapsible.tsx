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
        <div className=" flex justify-center items-center bg-black text-white font-bold flex-col">
            <button className="bg-green-500 rounded-md w-32 h-16 m-3 p-3 text-white flex justify-center items-center shadow-lg shadow-green-500/60 hover:bg-green-700 hover:shadow-green-700/60" onClick={toggle}>Filter Champions</button>
            {open ? <div className="border-2 border-rose-500 rounded-md w-64 h-96 overflow-y-auto" >{props.children}</div> : <div className="bg-black"/>}
        </div>
    )

}