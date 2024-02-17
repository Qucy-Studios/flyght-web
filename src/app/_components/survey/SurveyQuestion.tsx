import {ChevronDown, ChevronUp, X} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import SlideDown from "react-slidedown";
import {useState} from "react";
import {availableQuestionKinds, Choice, createRandomKey, Question} from "@/types/question";
import 'react-slidedown/lib/slidedown.css'
import SurveyQuestionChoice from "@/components/survey/SurveyQuestionChoice";
import {numberFormat} from "@/app";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type SurveyQuestionProps = {
    position: number,
    question: Question,
    onEdit: (question: Question) => void
    onMove: (type: 'up' | 'down') => void,
    onDelete: () => void
}

const SurveyQuestion = ({ position, question, onEdit, onMove, onDelete }: SurveyQuestionProps) => {
    const [showSelectMenu, setShowSelectMenu] = useState(false)

    const [showEmojiPicker, setShowEmojiPicker] = useState<Choice | null>(null)

    function addOption() {
        onEdit({ ...question, choices: [...question.choices, { key: createRandomKey(), text: '', description: null, emoji: null }]})
    }

    return (
        <div className={"flex flex-col gap-2 pt-1 lg:w-[480px]"}>
            <div className={"w-full border-zinc-800 backdrop-blur bg-opacity-30 border rounded"}>
                <div className={"border-b border-zinc-800 bg-zinc-900 bg-opacity-20 px-8 py-4"}>
                    <div className={`flex flex-row justify-between`}>
                        <div>
                            <h3 className={`font-bold text-lg`}>Question {position + 1}</h3>
                        </div>
                        <div className={"flex flex-row gap-2"}>
                            <button className={"clickable-hover-opacity"} onClick={() => onMove('up')}><ChevronUp size={24}/></button>
                            <button className={"clickable-hover-opacity"} onClick={() => onMove('down')}><ChevronDown size={24}/></button>
                            <button className={"clickable-hover-opacity text-red-500"} onClick={onDelete}><X size={24}/></button>
                        </div>
                    </div>
                </div>
                {question.errors.length > 0 ? (
                    <div className={"w-full border-zinc-800 bg-zinc-900 backdrop-blur bg-opacity-30 border-b rounded p-4"}>
                        <h3 className={`font-bold text-lg text-red-500`}>There are some issues with this question.</h3>
                        <div className={"font-light text-sm flex flex-col gap-2"}>
                            <p>We failed to save the survey because there are some issues with this question,
                                please try to resolve the following issues:</p>
                            <div className={"flex flex-col gap-2 pl-4"}>
                                {question.errors.map((error) => {
                                    return (
                                        <p className={"text-red-400"}>• {error}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className={"border-b border-zinc-800 px-8 py-4"}>
                    <div className={"flex flex-col gap-4 py-4"}>
                        <TextareaAutosize
                            className={"bg-transparent outline-none resize-none"}
                            draggable={false}
                            maxRows={4}
                            placeholder={question.kind === 'Text Block' ? "What do you want to inform the user?" : "What do you want to ask the user?"}
                            maxLength={1024}
                            defaultValue={question.question}
                            onInput={(ev) => {
                                //@ts-ignore
                                onEdit({ ...question, question: ev.target.value})
                            }}
                        />
                        <p className={"text-xs text-zinc-700"}>{numberFormat.format(question.question.length)} / 1,024</p>
                    </div>
                </div>
                <div className={"bg-zinc-800 bg-opacity-10 px-8"}>
                    {question.kind === 'Prompt' ? (
                            <div className={"flex flex-col gap-2 py-4"}>
                                <div className={"flex flex-col gap-4 py-4"}>
                                    <TextareaAutosize
                                        className={"bg-transparent outline-none resize-none"}
                                        draggable={false}
                                        maxRows={2}
                                        placeholder={"What would you like to write as a placeholder?"}
                                        maxLength={100}
                                        defaultValue={question.placeholder}
                                        onInput={(ev) => {
                                            //@ts-ignore
                                            onEdit({ ...question, placeholder: ev.target.value})
                                        }}
                                    />
                                    <p className={"text-xs text-zinc-700"}>{numberFormat.format(question.placeholder.length)} / 100</p>
                                </div>
                            </div>
                    ) : null}
                    {question.kind === 'Prompt' || question.kind === 'Yes or No' || question.kind === 'Text Block' ? null : (
                        <div className={"flex flex-col gap-2 py-4"}>
                            {question.choices.map((option, pos) => {
                                return (
                                    <SurveyQuestionChoice
                                        key={`choice-${option.key}`}
                                        emojiPicker={[showEmojiPicker, setShowEmojiPicker]}
                                        index={pos}
                                        option={option}
                                        edit={(index: number, value: Choice) =>  {
                                            const copy = [...question.choices]
                                            copy[index] = value;
                                            onEdit({ ...question, choices: copy });
                                        }}
                                        move={(up: boolean, index: number) => {
                                            if (up && index === 0) return
                                            if (!up && index === (question.choices.length - 1)) return

                                            let copy = [...question.choices];
                                            let a = copy[index];
                                            copy[index] = copy[index + (up ? -1 : 1)]
                                            copy[index + (up ? -1 : 1)] = a

                                            onEdit({...question, choices: copy})
                                        }}
                                        removeIndex={(index: number) => {
                                            onEdit({ ...question, choices: question.choices.filter((_, ind) => index !== ind)})
                                        }}
                                    />
                                )
                            })}
                            {question.choices.length >= 10 ? (
                                <p className={"w-fit text-sm max-w-sm text-zinc-300 clickable-hover-opacity"}>You can only add 10 choices.</p>
                            ) : (
                                <button className={"w-fit text-sm max-w-sm text-zinc-300 clickable-hover-opacity"} onClick={addOption}>Add option</button>
                    )}
                        </div>
                    )}
                </div>
                <div className={"rounded-b border-t border-zinc-800 py-3 bg-zinc-900 bg-opacity-50 px-4"}>
                    <div className={"w-fit"}>
                        <Select
                            value={question.kind}
                            onValueChange={(value) => {
                                onEdit({ ...question, kind: value })
                            }}>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {availableQuestionKinds.map((choice) => {
                                    return (
                                        <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <SlideDown className={"transition ease-in-out duration-500 pb-2"}>
                {showSelectMenu ? <div className={"rounded-b border border-zinc-800 py-3 bg-zinc-900 bg-opacity-50 px-4 flex flex-col gap-2 lg:w-fit"}>
                    {availableQuestionKinds.map((choice) => {
                        if (choice === question.kind) return null
                        return (
                            <button
                                key={`question-${position}-${choice}`}
                                onClick={() => {
                                onEdit({ ...question, kind: choice })

                                setShowSelectMenu(false);
                            }} className={"px-4 py-2 text-left clickable-hover-opacity text-sm w-fit"}>{choice}</button>
                        )
                    })}
                </div> : null}
            </SlideDown>
        </div>
    )
}

SurveyQuestion.whyDidYouRender = true
export default SurveyQuestion