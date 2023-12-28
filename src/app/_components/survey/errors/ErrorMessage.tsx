import SurveyAlert from "@/components/survey/SurveyAlert";

export default function ErrorMessage({ error }: { error: string }) {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <SurveyAlert title={"An error occurred."}>
                    <div className={"font-light text-sm flex flex-col gap-2"}>
                        <p>We couldn't load the survey editor with the following errors:</p>
                        <p className={"text-red-400"}>• {error}</p>
                    </div>
                </SurveyAlert>
            </section>
        </div>
    )
}