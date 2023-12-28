import {
    Flower,
    HardDriveUpload,
    ListChecks,
    ListTodo,
    MessageCircleQuestion,
    Plus,
    Save,
    Terminal,
    Text,
    ToggleRight
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function SurveyToolbar({ save, addQuestion }: {
    save: () => void,
    addQuestion: (kind: "Single-choice" | "Multi-choice" | "Prompt" | "Yes or No" | "Text Block") => void
}) {
    return (
        <div className={"w-full border-zinc-800 backdrop-blur bg-opacity-30 border rounded p-3 px-2 flex flex-row flex-wrap gap-2 items-center"}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={"outline"}>
                        <Plus className={"h-4 w-4 mr-2"}/>
                        Add
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"mx-4"}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => addQuestion('Prompt')}>
                            <Terminal className={"h-4 w-4 mr-2"}/>
                            Prompt Question
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addQuestion('Single-choice')}>
                            <ListTodo className={"h-4 w-4 mr-2"}/>
                            Single-choice Question
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addQuestion('Multi-choice')}>
                            <ListChecks className={"h-4 w-4 mr-2"}/>
                            Multi-choice Question
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addQuestion('Yes or No')}>
                            <ToggleRight className={"h-4 w-4 mr-2"}/>
                            Yes or No Question
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => addQuestion('Text Block')}>
                            <Text className={"h-4 w-4 mr-2"}/>
                            Text Block
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={save}>
                <HardDriveUpload className={"h-4 w-4 mr-2"}/>
                Save
            </Button>
        </div>
    )
}