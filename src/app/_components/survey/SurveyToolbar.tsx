import {ListChecks, ListTodo, Save, TerminalSquare, Text, ToggleRight} from "lucide-react";

export default function SurveyToolbar({ save, addQuestion }: {
    save: () => void,
    addQuestion: (kind: "Single-choice" | "Multi-choice" | "Prompt" | "Yes or No" | "Text Block") => void
}) {
    return (
        <div className={"w-full border-zinc-800 backdrop-blur bg-opacity-30 border rounded p-3 px-8 flex flex-row flex-wrap justify-between items-center"}>
            <button onClick={() => addQuestion('Prompt')} className={"clickable-hover-opacity"}>
                <TerminalSquare size={24}/>
            </button>
            <button onClick={() => addQuestion('Single-choice')} className={"clickable-hover-opacity"}>
                <ListTodo size={24}/>
            </button>
            <button onClick={() => addQuestion('Multi-choice')} className={"clickable-hover-opacity"}>
                <ListChecks size={24}/>
            </button>
            <button onClick={() => addQuestion('Yes or No')} className={"clickable-hover-opacity"}>
                <ToggleRight size={24}/>
            </button>
            <button onClick={() => addQuestion('Text Block')} className={"clickable-hover-opacity"}>
                <Text size={24}/>
            </button>
            <button onClick={save} className={"clickable-hover-opacity"}>
                <Save size={24}/>
            </button>
        </div>
    )
}