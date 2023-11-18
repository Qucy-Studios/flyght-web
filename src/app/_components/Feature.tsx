import {LucideIcon} from "lucide-react";

export default function Feature({ title, children, Icon }: { title: string, children: React.ReactNode, Icon: LucideIcon }) {
    return (
        <div className={"flex flex-col gap-2 h-full md:max-h-[256px] relative w-full border-zinc-800 backdrop-blur bg-opacity-30 border rounded p-8"}>
            <div className={"heropattern-graphpaper-zinc-900/50 absolute h-full w-full top-0 left-0 -z-20"}></div>
            <div className={"my-2"}>
                <Icon size={24}></Icon>
            </div>
            <h3 className={`font-bold text-4xl`}>{title}</h3>
            <p className={"font-light text-sm max-w-sm"}>{children}</p>
        </div>
    )
}