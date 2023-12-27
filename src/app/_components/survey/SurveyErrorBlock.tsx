import React from "react";

export default function SurveyErrorBlock({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className={"flex flex-col gap-2 h-full relative border-zinc-800 backdrop-blur bg-opacity-30 border rounded p-8 my-1"}>
            <div className={"heropattern-graphpaper-zinc-900/50 absolute h-full w-full top-0 left-0 -z-20"}></div>
            <h3 className={`font-bold text-lg text-red-600`}>{title}</h3>
            <div className={"font-light text-sm max-w-sm"}>
                {children}
            </div>
        </div>
    )
}