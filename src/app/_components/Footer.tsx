import {adventPro} from "@/app";
import {SiDiscord, SiGithub} from "@icons-pack/react-simple-icons";

export const Footer = () => {
  return (
      <footer className={"flex flex-col border-t border-t-zinc-900 w-full padding-standard"}>
          <section className={"flex flex-col gap-1 md:flex-row md:items-center md:justify-between select-none py-12"}>
              <div className={"flex flex-col gap-1 select-none"}>
                  <img src={"/flyght-256px-light.png"} alt={"Flyght Logo (Light)"} className={"w-12 h-12 select-none"}/>
                  <h3 className={`${adventPro.className} lowercase text-4xl`}>Flyght.</h3>
              </div>
              <div className={"my-2"}>
                  <p className={`${adventPro.className} lowercase text-xs`}>know your member system for discord.</p>
                  <p className={`${adventPro.className} lowercase text-xs`}>a proud product of qucy studios.</p>
                  <div className={"flex flex-row gap-5 pt-4"}>
                      <a href={"https://github.com/Qucy-Studios"} className={"clickable-hover-opacity"}><SiGithub/></a>
                      <a href={"/support"} className={"clickable-hover-opacity"}><SiDiscord/></a>
                  </div>
              </div>
          </section>
      </footer>
  )
}