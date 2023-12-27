"use client";

import {lora} from "@/app/_app";
import {usePathname} from "next/navigation";

export const Header = () => {
    const pathname = usePathname()
    const isSticky = !pathname.startsWith("/survey")
  return (
      <nav className={`${isSticky ? 'sticky' : ''} top-0 z-50 items-center align-middle justify-center w-full flex`}>
          <div className={"flex flex-row justify-between gap-2 backdrop-blur bg-zinc-800 bg-opacity-30 select-none w-[80%] border rounded-full border-zinc-800 py-4 px-8 my-4"}>
              <a href={"/"} className={`${lora.className} font-bold lowercase text-2xl`}>Flyght.</a>
              <div className={"flex flex-row gap-2 items-center"}>
                  <a href={"/premium"} rel={"external"} target={"_blank"} className={"text-sm text-yellow-400 clickable-hover-opacity"}>Premium</a>
                  <p className={"text-sm text-zinc-400"}>•</p>
                  <a href={"/invite"}  rel={"external"} target={"_blank"} className={"text-sm text-zinc-400 clickable-hover-opacity"}>Invite</a>
                  <p className={"text-sm text-zinc-400"}>•</p>
                  <a href={"/support"} rel={"external"} target={"_blank"} className={"text-sm text-zinc-400 clickable-hover-opacity"}>Support</a>
              </div>
          </div>
      </nav>
  )
}