"use client";

import {ggsans} from "@/app/_app";
import Message from "@/app/_components/discord/Message";
import BotBadge from "@/app/_components/discord/BotBadge";
import MessageEmbed from "@/app/_components/discord/Embed";
import Chat from "@/app/_components/discord/Chat";
import {useState} from "react";

export default function DiscordHomepageStack() {
    let [page, setPage] = useState(0)

    return (
        <Chat>
            <div className={`flex flex-col min-w-full min-h-full ${ggsans.className}`}>
                <Message color={"text-white"} avatar={"/flyght-profile.png"} name={"Flyght"} time={"Today at 12:00 A.M"} badge={<BotBadge/>}>
                    <MessageEmbed color="bg-pink-300">
                        <p className={`text-sm font-bold`}>
                            <img src="/assets/emoticons/sprite_question.png" className="w-5 inline-block mr-1" alt="Hi Emoji"/> Page {page + 1} of 3
                        </p>
                        {page === 0 ? (
                            <p className={`text-sm`}>
                                Would you like to invite Flyght to your server?
                            </p>
                        ) : page === 1 ? (
                            <p className={`text-sm`}>
                                How about trying out Flyght in action on our support server first?
                            </p>
                        ) : (
                            <p className={`text-sm`}>
                                Okay, we understand. Thank still for taking the time to explore the
                                possibility of using Flyght!
                            </p>
                        )}
                    </MessageEmbed>
                    {page <= 1 ? (
                        <div className={"flex flex-row gap-2 items-center"}>
                            <button onClick={() => setPage(0)} className={"bg-[#424549] rounded py-1.5 font-medium px-4 bg-opacity-80 w-fit clickable-hover-opacity"}>
                                Retry
                            </button>
                            <a href={"/invite"} className={"bg-[#57F287] rounded py-1.5 font-medium px-6 bg-opacity-60 w-fit clickable-hover-opacity"}>
                                Yes
                            </a>
                            <button
                                className={"bg-[#ED4245] rounded py-1.5 font-medium px-6 bg-opacity-80 w-fit clickable-hover-opacity"}
                                onClick={() => setPage(page + 1)}
                            >
                                No
                            </button>
                        </div>
                    ) : null}
                </Message>
            </div>
        </Chat>
    )
}