"use client";

import {adventPro, ggsans,} from "@/app/_app";
import {SiDiscord} from "@icons-pack/react-simple-icons";
import {Atom, Lock, LucideMessagesSquare, SmilePlus, Sticker} from "lucide-react";
import Feature from "@/app/_components/Feature";

export default function Home() {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <h1 className={`${adventPro.className} text-5xl max-w-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-200 to-cyan-300`}>
                    Know your members before letting them join the server.
                </h1>
                <p className={"text-2xl max-w-3xl font-light"}>
                    Flyght is a Discord bot that brings Know-Your-Member to Discord servers.
                    Administrators can design a survey for new members to answer before being able to access
                    the server<a href={"#footnote-1"} className={"text-lg text-blue-400"}>*</a>.
                </p>
                <p className={"max-w-3xl text-xs"} id={"footnote-1"}>
                    * Know-Your-Member system sends the responses to a Discord channel where the administrators can
                    approve or reject the user's join request. Servers can also enable auto-approval to auto-approve new
                    members.
                </p>
                <div className={"my-2 flex flex-row flex-wrap gap-2 items-center"} id={"buttons"}>
                    <a href={"/invite"}
                       className={`py-2 px-5 clickable-hover w-full md:w-fit rounded flex flex-row gap-2 items-center bg-blue-700`}>
                        <SiDiscord/>
                        <span className={`font-bold ${ggsans.className} text-xl`}>Invite Now</span>
                    </a>
                    <a href={"/support"}
                       className={`py-2 px-5 clickable-hover w-full md:w-fit rounded flex flex-row gap-2 items-center bg-zinc-800`}>
                        <LucideMessagesSquare size={24} strokeWidth={1.5}/>
                        <span className={`font-bold ${ggsans.className} text-xl`}>Support</span>
                    </a>
                </div>
            </section>
            <section className={"py-8 grid grrd-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-900"}>
                <Feature title={"Powerful."} Icon={Atom}>
                    Flyght was designed to support as many kinds of questions as possible
                    all within the Discord interface, no more answering via an external website, or
                    related paireed with powerful features such as webhooks and many more!
                </Feature>
                <Feature title={"User Friendly."} Icon={SmilePlus}>
                    Designed with user-experience in mind, Flyght was built to be incredibly user-friendly, making
                    it quick to be understood by both the administrators and users.
                </Feature>
                <Feature title={"Privacy First."} Icon={Lock}>
                    Flyght's Know Your Member system was built with privacy as one of its core focuses. All responses
                    are not stored in our databases, they are directly sent to the server's staffs through a designated
                    text channel.
                </Feature>
                <Feature title={"Build better."} Icon={Sticker}>
                    Create a higher quality community with the Know Your Member system. Know what kind of members you are
                    coming into your server, and build the best community catered to their tastes.
                </Feature>
            </section>
        </div>
    )
}
