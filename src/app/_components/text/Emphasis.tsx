import React from "react";

export default function Emphasis({ children }: { children: React.ReactNode }) {
    return (
        <b className={"text-zinc-200 font-bold"}>{children}</b>
    )
}