import {Disc3} from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col gap-2 py-12 m-auto align-middle min-h-screen justify-center items-center">
            <section id={"hero"} className={"flex flex-col gap-3 animate-pulse"}>
                <Disc3 className={"animate-spin duration-700 transition ease-in-out w-12 h-12 select-none"}>Loading...</Disc3>
            </section>
        </div>
    )
}