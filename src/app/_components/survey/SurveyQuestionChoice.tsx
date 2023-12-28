import {Choice} from "@/types/question";
import {ChevronDown, ChevronUp, Smile, X} from "lucide-react";
import EmojiPicker, {EmojiStyle, Theme} from "emoji-picker-react";
import {Dispatch, SetStateAction} from "react";
import {numberFormat} from "@/app";

type SurveyQuestionChoiceProps = {
    emojiPicker: [(Choice | null), Dispatch<SetStateAction<Choice | null>>],
    index: number,
    option: Choice,
    edit: (index: number, value: Choice) => void
    move: (up: boolean, index: number) => void,
    removeIndex: (index: number) => void
}

const SurveyQuestionChoice = ({ emojiPicker, index, option, edit, move, removeIndex }: SurveyQuestionChoiceProps) => {
    let [showEmojiPicker, setShowEmojiPicker] = emojiPicker

    return (
        <div className={"bg-zinc-950 bg-opacity-30 border rounded border-zinc-800 flex flex-col gap-2"}>
            <div className={"flex flex-row gap-2 justify-between p-2"}>
                <p className={"text-xs text-zinc-700"}>Choice {index + 1}</p>
                <div className={"flex flex-row gap-2"}>
                    <button onClick={() => move(true, index)} className={"clickable-hover-opacity"}><ChevronUp size={24}/></button>
                    <button onClick={() => move(false, index)} className={"clickable-hover-opacity"}><ChevronDown size={24}/></button>
                    <button className={"clickable-hover-opacity text-red-500"} onClick={() => removeIndex(index)}><X size={24}/></button>
                </div>
            </div>
            <div className={"flex flex-col items-center gap-4 px-3 pb-2"}>
                <div className={"flex flex-row gap-2 items-center w-full"}>
                    <button onClick={() => setShowEmojiPicker(showEmojiPicker === option ? null : option)} className={"px-1 clickable-hover-opacity"}>
                        {option.emoji == null ? <Smile size={24}/> : <p className={"text-[24px]"}>{option.emoji}</p>}
                    </button>

                    <input type={"text"}
                        className={"bg-transparent outline-none resize-none w-full"}
                        draggable={false}
                        placeholder={`Choice ${index + 1}`}
                        maxLength={100}
                        defaultValue={option.text}
                        onInput={(ev) => {
                            //@ts-ignore
                            edit(index, { key: option.key, text: ev.target.value, emoji: option.emoji, description: option.description })
                        }}
                    />
                    <p className={"px-1 text-xs text-zinc-700"}>{numberFormat.format(100 - option.text.length)}</p>
                </div>
                {showEmojiPicker === option ? (
                    <EmojiPicker
                        autoFocusSearch={false}
                        emojiStyle={EmojiStyle.NATIVE}
                        className={"py-2 max-w-[98%] border-zinc-800 border bg-zinc-800 bg-opacity-30"}
                        theme={Theme.DARK}
                        style={{
                            width: "100%"
                        }}
                        skinTonesDisabled={true}
                        onEmojiClick={(emoji) => {
                            edit(index, { key: option.key, text: option.text, emoji: emoji.emoji, description: option.description })
                        }}
                    />
                ) : null}
            </div>
            <div className={"flex flex-col gap-2 w-full border-t border-zinc-800 px-3 py-2 pb-4 bg-zinc-800 bg-opacity-20"}>
                <p className={"text-xs text-zinc-700"}>Description</p>
                <div className={"flex flex-row gap-2 items-center w-full"}>
                    <input type={"text"}
                        className={"bg-transparent outline-none resize-none w-full"}
                        draggable={false}
                        placeholder={"No description."}
                        maxLength={50}
                        defaultValue={option.description ?? ''}
                        onInput={(ev) => {
                            //@ts-ignore
                            if (ev.target.value === '') {
                                //@ts-ignore
                                edit(index, { key: option.key, text: option.text, emoji: option.emoji, description: null })
                                return
                            }

                            //@ts-ignore
                            edit(index, { key: option.key, text: option.text, emoji: option.emoji, description: ev.target.value })
                        }}
                    />
                    <p className={"px-1 text-xs text-zinc-700"}>{numberFormat.format(50 - (option.description?.length ?? 0))}</p>
                </div>
            </div>
        </div>
    )
}

SurveyQuestionChoice.whyDidYouRender = true
export default SurveyQuestionChoice