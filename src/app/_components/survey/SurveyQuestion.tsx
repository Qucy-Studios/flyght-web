import {ChevronDown, ChevronUp, CornerDownRight, Smile, X} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import SlideDown from "react-slidedown";
import {useEffect, useState} from "react";
import {Choice, Question} from "@/app/_types/question";
import 'react-slidedown/lib/slidedown.css'
import EmojiPicker, {EmojiStyle, Theme} from "emoji-picker-react";

type SurveyQuestionProps = {
    index: number,
    source: Question,
    onEdit: (question: Question) => void
    onMove: (type: 'up' | 'down') => void,
    onDelete: () => void
}

export const availableKinds = ["Single-choice", "Multi-choice", "Prompt", "Yes or No", "Text Block"]
const numberFormat = Intl.NumberFormat('en-US')

export default function SurveyQuestion({ index, source, onEdit, onMove, onDelete }: SurveyQuestionProps) {
    const [position, setPosition] = useState(index)
    const [showSelectMenu, setShowSelectMenu] = useState(false)
    const [question, setQuestion] = useState(source)

    const [showEmojiPicker, setShowEmojiPicker] = useState<Choice | null>(null)

    useEffect(() => {
        setPosition(index)
        setQuestion(source)
    }, [index, source]);

    function addOption() {
        onEdit({ ...question, choices: [...question.choices, { text: '', description: null, emoji: null }]})
    }

    function removeIndex(index: number) {
        onEdit({ ...question, choices: question.choices.filter((_, ind) => index !== ind)})
    }

    function edit(index: number, value: Choice) {
        const copy = [...question.choices]
        copy[index] = value;
        onEdit({ ...question, choices: copy });
    }

    function move(up: boolean, index: number) {
        if (up && index === 0) return
        if (!up && index === (question.choices.length - 1)) return
        let copy = [...question.choices];
        let a = copy[index];
        copy[index] = copy[index + (up ? -1 : 1)]
        copy[index + (up ? -1 : 1)] = a
        onEdit({...question, choices: copy})
    }

    return (
        <div className={"flex flex-col gap-2 pt-1"}>
            <div className={"w-full border-zinc-800 backdrop-blur bg-opacity-30 border rounded"}>
                <div className={"py-4 px-8"}>
                    {question.errors.length > 0 ? (
                            <div className={"w-full border-zinc-400 bg-zinc-900 backdrop-blur bg-opacity-30 border rounded p-4 my-2"}>
                                <h3 className={`font-bold text-lg`}>This question has some errors.</h3>
                                <div className={"font-light text-sm max-w-sm flex flex-col gap-2"}>
                                    {question.errors.map((error) => {
                                        return (
                                            <p className={"text-red-400"}>• {error}</p>
                                        )
                                    })}
                                </div>
                            </div>
                    ) : null}
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
                    <div className={"flex flex-col gap-4 py-4"}>
                        <TextareaAutosize
                            className={"bg-transparent outline-none resize-none"}
                            draggable={false}
                            maxRows={4}
                            placeholder={"Write the question here."}
                            maxLength={1024}
                            defaultValue={question.question}
                            onInput={(ev) => {
                                //@ts-ignore
                                onEdit({ ...question, question: ev.target.value})
                            }}
                        />
                        <p className={"text-xs text-zinc-700"}>{numberFormat.format(question.question.length)} / 1,024</p>
                    </div>
                    {question.kind === 'Prompt' || question.kind === 'Yes or No' || question.kind === 'Text Block' ? null : (
                        <div className={"flex flex-col gap-2 py-4"}>
                            {question.choices.map((option, index) => {
                                return (
                                    <div className={"bg-zinc-900 bg-opacity-30 border rounded border-zinc-800 p-2 flex flex-col gap-2"}>
                                        <div className={"flex flex-row gap-2 justify-between"}>
                                            <p className={"text-xs text-zinc-700"}>Choice {index + 1}</p>
                                            <div className={"flex flex-row gap-2"}>
                                                <button onClick={() => move(true, index)} className={"clickable-hover-opacity"}><ChevronUp size={24}/></button>
                                                <button onClick={() => move(false, index)} className={"clickable-hover-opacity"}><ChevronDown size={24}/></button>
                                                <button className={"clickable-hover-opacity text-red-500"} onClick={() => removeIndex(index)}><X size={24}/></button>
                                            </div>
                                        </div>
                                        <div className={"flex flex-col items-center gap-4 px-1"}>
                                            <div className={"flex flex-row gap-2 items-center w-full"}>
                                                <button onClick={() => setShowEmojiPicker(showEmojiPicker === option ? null : option)} className={"px-1 clickable-hover-opacity"}>
                                                    {option.emoji == null ? <Smile size={24}/> : <p className={"text-[24px]"}>{option.emoji}</p>}
                                                </button>

                                                <input type={"text"} maxLength={100} minLength={1} defaultValue={option.text} onInput={(ev) => {
                                                    //@ts-ignore
                                                    edit(index, { text: ev.target.value, emoji: option.emoji, description: option.description })
                                                }} className={"outline-none bg-transparent w-full"} placeholder={`Choice ${index + 1}`}/>
                                                <p className={"px-1 text-xs text-zinc-700"}>{numberFormat.format(100 - question.choices[index].text.length)}</p>
                                            </div>
                                            {showEmojiPicker === option ? <EmojiPicker emojiStyle={EmojiStyle.NATIVE} className={"py-2 max-w-[98%]"} theme={Theme.DARK} skinTonesDisabled={true} onEmojiClick={(emoji) => {
                                                edit(index, { text: option.text, emoji: emoji.emoji, description: option.description })
                                            }}/> : null}
                                            <div className={"flex flex-col gap-2 w-full"}>
                                                <p className={"text-xs text-zinc-700"}>Description</p>
                                                <div className={"flex flex-row gap-2 items-center w-full"}>
                                                    <input type={"text"} maxLength={50} minLength={1} defaultValue={option.description ?? ''} onInput={(ev) => {
                                                        //@ts-ignore
                                                        if (ev.target.value === '') {
                                                            //@ts-ignore
                                                            edit(index, { text: option.text, emoji: option.emoji, description: null })
                                                            return
                                                        }

                                                        //@ts-ignore
                                                        edit(index, { text: option.text, emoji: option.emoji, description: ev.target.value })
                                                    }} className={"outline-none bg-transparent w-full"} placeholder={`No description`}/>
                                                    <p className={"px-1 text-xs text-zinc-700"}>{numberFormat.format(50 - (question.choices[index].description?.length ?? 0))}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {question.choices.length >= 10 ? (
                                <p className={"w-fit text-sm max-w-sm pt-2 text-zinc-300 clickable-hover-opacity"}>You can only add 10 choices.</p>
                            ) : (
                                <button className={"w-fit text-sm max-w-sm pt-2 text-zinc-300 clickable-hover-opacity"} onClick={addOption}>Add option</button>
                    )}
                        </div>
                    )}
                </div>
                <div className={"rounded-b border-t border-zinc-800 py-3 bg-zinc-900 bg-opacity-50 px-4"}>
                    <div className={"px-4 py-2 bg-zinc-900 w-fit rounded"}>
                        <button className={"flex flex-row items-center gap-2 clickable-hover-opacity"}
                                onClick={() => setShowSelectMenu(!showSelectMenu)}>
                            <p className={"text-sm"}>{question.kind}</p>
                            {showSelectMenu ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                        </button>
                    </div>
                </div>
            </div>
            <SlideDown className={"transition ease-in-out duration-500 pb-2"}>
                {showSelectMenu ? <div className={"rounded-b border border-zinc-800 py-3 bg-zinc-900 bg-opacity-50 px-4 flex flex-col gap-2 lg:w-fit"}>
                    {availableKinds.map((choice) => {
                        if (choice === question.kind) return null
                        return (
                            <button onClick={() => {
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