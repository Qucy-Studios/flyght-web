import {adventPro} from "@/app/_app";

export const Header = () => {
  return (
      <nav className={"flex flex-row gap-6 items-center justify-between select-none w-full"}>
          <h3 className={`${adventPro.className} lowercase text-4xl`}>Flyght.</h3>
      </nav>
  )
}