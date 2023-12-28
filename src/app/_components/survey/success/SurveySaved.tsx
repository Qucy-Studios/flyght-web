import SurveyAlert from "@/components/survey/SurveyAlert";
import Emphasis from "@/components/text/Emphasis";

export default function SurveySaved() {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <SurveyAlert title={"Successfully saved!"} color={"text-green-400"}>
                    <div className={"font-light text-sm flex flex-col gap-2"}>
                        <p className={"text-2xl font-light"}>
                            We've saved and applied the survey to your server.
                        </p>
                        <p className={"text-zinc-200"}>
                            New users should be seeing this survey, if the server has the <Emphasis>Know-Your-Member</Emphasis> system enabled.
                            You can, however, preview the survey through the following methods:
                        </p>
                        <p className={"text-zinc-300 pl-2"}>
                            • Running the <span className={"text-blue-400 p-0.5 bg-zinc-900 bg-opacity-40 rounded"}>/survey preview</span> command
                            in your Discord server.
                        </p>
                        <div className={"my-2 border-[0.5px] border-zinc-900"}/>
                        <p className={"text-zinc-200"}>
                            As the link is one-time use, due to security purposes, you can no longer update the
                            server's survey through this page. If you still want to create modifications to the survey, you
                            can do the following:
                        </p>
                        <p className={"text-zinc-300 pl-2"}>
                            • Generate a new link using the <span className={"text-blue-400 p-0.5 bg-zinc-900 bg-opacity-40 rounded"}>/survey edit</span> command
                            in your Discord server that you want to edit the survey.
                        </p>
                    </div>
                </SurveyAlert>
            </section>
        </div>
    )
}