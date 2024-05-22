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
        <div className=" flex justify-center items-center bg-black text-white font-bold flex-col h-fit">
            <button className="bg-blue-500 rounded-md w-32 h-16 m-3 p-3 text-white" onClick={toggle}>Filter Champions</button>
            {open ? <div className="border-2 border-rose-500 rounded-md w-48">{props.children}</div> : <div className="h-screen bg-black"/>}
        </div>
    )

}