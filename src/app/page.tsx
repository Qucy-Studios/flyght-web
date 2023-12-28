"use client";

import {inter, lora, playfairDisplay} from "@/app";
import {Airplay} from "lucide-react";
import {SiDiscord} from "@icons-pack/react-simple-icons";
import Emphasis from "@/components/text/Emphasis";
import DiscordHomepageStack from "@/components/discord/stack/DiscordHomepageStack";

export default function Home() {
    return (
        <div>
            <div className="flex flex-col gap-2 w-full px-6 lg:px-16">
                <section className={`w-full flex flex-col gap-2 pt-16 pb-4 ${lora.className} border-b border-zinc-800`}>
                    <h2 className={`text-5xl font-bold`}>Build a better community</h2>
                    <h3 className={`text-2xl font-medium text-zinc-300`}>by knowing your members.</h3>
                    <p className={"py-4 text-zinc-400 max-w-2xl"}>
                        Flyght enables server owners to
                        <b className={"text-zinc-200 font-bold"}> survey new members </b>
                        right from the Discord application to help servers know what their community wants,
                        what they are after and what to do to <b className={"text-zinc-200 font-bold"}> build a better community. </b>
                    </p>
                    <div className={"pb-6 flex flex-row items-center gap-2"}>
                        <a href={"/invite"} rel={"external"} target={"_blank"} className={`flex flex-row gap-2 items-center clickable-hover-opacity bg-blue-500 text-white w-fit p-2 px-4 font-medium rounded ${inter.className}`}>
                            <SiDiscord size={24}/>
                        </a>
                        <a href={"/support"} rel={"external"} target={"_blank"} className={`flex flex-row gap-2 items-center clickable-hover-opacity bg-white text-black md:w-fit p-2 px-4 font-medium rounded ${inter.className}`}>
                            <Airplay size={18}/>
                            See it in action!
                        </a>
                    </div>
                </section>
                <section className={`w-full grid grid-cols-1 md:grid-cols-2 gap-2 py-16 ${lora.className}`}>
                    <div>
                        <h2 className={`text-5xl font-bold italic text-zinc-300 uppercase ${playfairDisplay.className} pt-4 md:pt-0`}>Privacy First.</h2>
                        <p className={"py-4 text-zinc-400 max-w-2xl"}>
                            Flyght
                            <Emphasis> does not store responses of the user in our databases</Emphasis>.
                            Only the user and the server staff members can know what was said, silence and peace as it is.
                        </p>
                    </div>
                    <div>
                        <h2 className={`text-5xl font-bold italic text-zinc-300 uppercase ${playfairDisplay.className} pt-4 md:pt-16`}>Cool.</h2>
                        <p className={"py-4 text-zinc-400"}>
                            Flyght
                            <Emphasis> packs as much features as possible within Discord</Emphasis>.
                            Featuring the latest features of Discord with extensive customizations to make the best experience for new users.
                        </p>
                    </div>
                    <div>
                        <h2 className={`text-5xl font-bold italic text-zinc-300 uppercase ${playfairDisplay.className} pt-4 md:pt-0`}>User-Friendly.</h2>
                        <p className={"py-4 text-zinc-400"}>
                            Flyght
                            <Emphasis> is designed with the user experience as the first priority</Emphasis>. We rigorously test the
                            designs of the service to create a smooth, seamless flow for the user.
                        </p>
                    </div>
                    <div>
                        <h2 className={`text-5xl font-bold italic text-zinc-300 uppercase ${playfairDisplay.className} pt-4 md:pt-16`}>Secure.</h2>
                        <p className={"py-4 text-zinc-400"}>
                            Flyght
                            <Emphasis> doesn't ask users to go to another website to answer the surveys</Emphasis>.
                            Users answer the questions right from the Discord application, giving your users the best sense of security.
                        </p>
                    </div>
                </section>
            </div>
            <DiscordHomepageStack/>
        </div>
    )
}