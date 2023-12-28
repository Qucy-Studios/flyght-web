import SurveyAlert from "@/components/survey/SurveyAlert";

export default function InvalidLink() {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <SurveyAlert title={"Invalid link."}>
                    <div className={"font-light text-sm flex flex-col gap-2"}>
                        <p className={"text-2xl font-light"}>
                            Oops! It seems like the link has already been used, or has expired and cannot be used
                            for security purposes.
                        </p>
                        <p className={"text-zinc-200"}>Here's what you can do instead:</p>
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