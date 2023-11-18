import Image from "next/image";
import {adventPro} from "@/app/_app";

export const Header = () => {
  return (
      <nav className={"flex flex-row gap-6 items-center justify-between select-none"}>
          <Image width={128} height={128} src={"/flyght-256px-light.png"} alt={"Flyght Logo (Light)"} className={"w-12 h-12 select-none"}/>
          <h3 className={`${adventPro.className} lowercase text-4xl`}>Flyght.</h3>
      </nav>
  )
}