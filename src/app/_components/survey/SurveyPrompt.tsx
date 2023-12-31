export default function SurveyPrompt() {
    return (
        <div className={"flex flex-col gap-2 relative border-zinc-800 backdrop-blur bg-opacity-30 border rounded p-8"}>
            <div className={"heropattern-graphpaper-zinc-900/50 absolute h-full w-full top-0 left-0 -z-20"}></div>
            <h3 className={`font-bold text-lg`}>Welcome to the Survey Editor</h3>
            <p className={"font-light text-sm max-w-sm"}>
                In here, you can edit your server's survey easily. To add questions, simply click on any of the
                types in the toolbar below this prompt.
                <br/>
                <br/>
                To remove questions, click the <span className={"text-red-400"}>X</span> icon on the question.
                <br/>
                To add questions to the survey, use the tool bar below.
            </p>
        </div>
    )
}