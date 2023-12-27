import {Choice} from "@/app/_types/question";
import {ChevronDown, ChevronUp, Smile, X} from "lucide-react";
import EmojiPicker, {EmojiStyle, Theme} from "emoji-picker-react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import TextareaAutosize from "react-textarea-autosize";

type SurveyQuestionChoiceProps = {
    emojiPicker: [(Choice | null), Dispatch<SetStateAction<Choice | null>>],
    index: number,
    option: Choice,
    edit: (position: number, value: Choice) => void
    move: (up: boolean, position: number) => void,
    removeIndex: (position: number) => void
}

const numberFormat = Intl.NumberFormat('en-US')

export default function SurveyQuestionChoice({ emojiPicker, index, option, edit, move, removeIndex }: SurveyQuestionChoiceProps) {

    const [position, setPosition] = useState(index)
    const [choice, setChoice] = useState(option)

    let [showEmojiPicker, setShowEmojiPicker] = emojiPicker

    useEffect(() => {
        setPosition(index)
        setChoice(option)
    }, [index, option]);

    return (
        <div className={"bg-zinc-900 bg-opacity-30 border rounded border-zinc-800 p-2 flex flex-col gap-2"}>
            <div className={"flex flex-row gap-2 justify-between"}>
                <p className={"text-xs text-zinc-700"}>Choice {position + 1}</p>
                <div className={"flex flex-row gap-2"}>
                    <button onClick={() => move(true, position)} className={"clickable-hover-opacity"}><ChevronUp size={24}/></button>
                    <button onClick={() => move(false, position)} className={"clickable-hover-opacity"}><ChevronDown size={24}/></button>
                    <button className={"clickable-hover-opacity text-red-500"} onClick={() => removeIndex(position)}><X size={24}/></button>
                </div>
            </div>
            <div className={"flex flex-col items-center gap-4 px-1"}>
                <div className={"flex flex-row gap-2 items-center w-full"}>
                    <button onClick={() => setShowEmojiPicker(showEmojiPicker === choice ? null : choice)} className={"px-1 clickable-hover-opacity"}>
                        {choice.emoji == null ? <Smile size={24}/> : <p className={"text-[24px]"}>{choice.emoji}</p>}
                    </button>

                    <TextareaAutosize
                        className={"bg-transparent outline-none resize-none w-full"}
                        draggable={false}
                        maxRows={1}
                        placeholder={`Choice ${position + 1}`}
                        maxLength={100}
                        defaultValue={choice.text}
                        onInput={(ev) => {
                            //@ts-ignore
                            edit(position, { text: ev.target.value, emoji: choice.emoji, description: choice.description })
                        }}
                    />
                    <p className={"px-1 text-xs text-zinc-700"}>{numberFormat.format(100 - choice.text.length)}</p>
                </div>
                {showEmojiPicker === choice ? (
                    <EmojiPicker
                        emojiStyle={EmojiStyle.NATIVE}
                        className={"py-2 max-w-[98%]"}
                        theme={Theme.DARK}
                        skinTonesDisabled={true}
                        onEmojiClick={(emoji) => {
                            edit(position, { text: choice.text, emoji: emoji.emoji, description: choice.description })
                        }}
                    />
                ) : null}
                <div className={"flex flex-col gap-2 w-full"}>
                    <p className={"text-xs text-zinc-700"}>Description</p>
                    <div className={"flex flex-row gap-2 items-center w-full"}>
                        <TextareaAutosize
                            className={"bg-transparent outline-none resize-none w-full"}
                            draggable={false}
                            maxRows={1}
                            placeholder={"No description."}
                            maxLength={50}
                            defaultValue={choice.description ?? ''}
                            onInput={(ev) => {
                                //@ts-ignore
                                if (ev.target.value === '') {
                                    //@ts-ignore
                                    edit(position, { text: choice.text, emoji: choice.emoji, description: null })
                                    return
                                }

                                //@ts-ignore
                                edit(position, { text: choice.text, emoji: choice.emoji, description: ev.target.value })
                            }}
                        />
                        <p className={"px-1 text-xs text-zinc-700"}>{numberFormat.format(50 - (choice.description?.length ?? 0))}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}