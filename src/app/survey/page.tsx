"use client";

import {useSearchParams} from "next/navigation";
import SurveyPrompt from "@/app/_components/survey/SurveyPrompt";
import {useEffect, useState} from "react";
import {
    clientToNativeKind,
    createRandomKey,
    isNonDecorative,
    NativeQuestion,
    nativeToClient,
    Question
} from "@/app/_types/question";
import SurveyQuestion, {availableKinds} from "@/app/_components/survey/SurveyQuestion";
import {Disc3} from "lucide-react";
import {Token} from "@/app/_types/token";
import {Survey} from "@/app/_types/survey";
import SurveyToolbar from "@/app/_components/survey/SurveyToolbar";
import SurveyErrorBlock from "@/app/_components/survey/SurveyErrorBlock";

export default function SurveyEditor() {

    const searchParams = useSearchParams()
    const accessToken = searchParams.get('access_token')

    // Flyght Origin (used by setup command)
    const origin = searchParams.get('origin')

    if (accessToken == null) return (<InvalidLink/>)

    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState(null as string | null)
    const [openToken, setOpenToken] = useState('')

    const [existingSurvey, setExistingSurvey] = useState(null as Survey | null)
    const [questions, setQuestions] = useState([] as Question[])

    const [saving, setSaving] = useState(false)
    const [usedToken, setUsedToken] = useState(false)
    const [errors, setErrors] = useState([] as string[])
    useEffect(() => {
        if (!accessToken) return
        if (openToken) return;
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/token/exchange`, {
            method: 'POST',
            headers: {
                Authorization: accessToken,
            }
        }).then(async (response) => {
            if (!response.ok) {
                try {
                    const { error } = await response.json() as { code: number, error: string }
                    setLoadError(error)
                } catch (err) {
                    setLoadError(`Failed to load existing survey, unable to decipher. Server returned a status ${response.status} (${response.statusText}) code.`)
                }
                return
            }

            const token = (await response.json()) as Token
            setOpenToken(token.key)
        }).catch((error) => {
            let message = 'Unknown error.'
            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            setLoadError(message)
        })
    }, [accessToken]);

    useEffect(() => {
        if (!openToken) return
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/survey`, {
            method: 'GET',
            headers: {
                Authorization: openToken
            }
        }).then(async (response) => {
            if (!response.ok) {
                try {
                    const {  error } = await response.json() as { code: number, error: string }
                    setLoadError(error)
                } catch (err) {
                    setLoadError(`Failed to load existing survey, unable to decipher. Server returned a status ${response.status} (${response.statusText}) code.`)
                }
                return
            }

            const survey = (await response.json()) as Survey
            setExistingSurvey(survey)

            if (survey.questions != null) {
                setQuestions(nativeToClient(survey.questions) as Question[])
            }
        }).then(() => setIsLoading(false)).catch((error) => {
            let message = 'Unknown error.'
            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            setLoadError(message)
        })
    }, [openToken]);

    if (isLoading) {
        return (<Loading/>)
    }

    if (loadError != null) {
        return (<ErrorMessage error={loadError}/>)
    }

    if (existingSurvey == null || questions == null) {
        return (<InvalidLink/>)
    }
    function calculateSizes() {
        let [textBlocks, nonDecoratives] = [0, 0]
        for (let question of questions) {
            if (question.kind === 'Text Block') {
                textBlocks++
                continue
            }

            nonDecoratives++
        }
        return { textBlocks, nonDecoratives }
    }
    function addQuestion(kind: "Single-choice" | "Multi-choice" | "Prompt" | "Yes or No" | "Text Block") {
        const { textBlocks, nonDecoratives } =  calculateSizes()
        if (kind === 'Text Block' && textBlocks >= 2) return;
        if (isNonDecorative(kind) && nonDecoratives >= 5)  return;
        setQuestions([...questions, {choices: [], question: '', kind: kind, errors: []}])

        setTimeout(() => window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        }), 100)
    }

    function removeIndex(index: number) {
        setQuestions(questions.filter((_, ind) => index !== ind))
    }

    function move(up: boolean, index: number) {
        if (up && index === 0) return
        if (!up && index === (questions.length - 1)) return
        setQuestions(prevState => {
            let copy = [...prevState];
            let a = copy[index];
            copy[index] = copy[index + (up ? -1 : 1)]
            copy[index + (up ? -1 : 1)] = a
            return copy
        })
    }

    async function save() {
        if (saving) {
            return
        }

        setSaving(true)
        let hasErrors = false
        let copy = [] as Question[]

        if (questions.length < 1) {
            setErrors(["You cannot save an empty survey. Please add at least one question."])
            setSaving(false)
            return
        }

        for (let question of questions) {
            if (question.errors.length > 0) {
                question.errors = []
            }
            if (question.choices.length == 0 && !(question.kind === 'Prompt' || question.kind === 'Yes or No' || question.kind === 'Text Block')) {
                question.errors = [...question.errors, 'You need to have at least 1 choice in choice-based question.']
                hasErrors = true
            }
            if (question.choices.length > 10) {
                question.errors = [...question.errors, 'You cannot add more than 10 choices.']
                hasErrors = true
            }
            for (let choice of question.choices) {
                if (choice.text.length > 100) {
                    question.errors = [...question.errors, 'A choice cannot be more than 100 characters.']
                    hasErrors = true
                    break
                }

                if (choice.description != null && choice.description.length > 50) {
                    question.errors = [...question.errors, 'A choice\'s description cannot be more than 100 characters.']
                    hasErrors = true
                    break
                }
            }
            if (question.question.length > 1024) {
                question.errors = [...question.errors, 'You can only write up to 1,024 characters for the question.']
                hasErrors = true
            }
            if (!availableKinds.includes(question.kind)) {
                question.errors = [...question.errors, `Unknown question kind. [kind=${question.kind}]`]
                hasErrors = true
            }
            copy = [...copy, question]
        }
        setQuestions(copy)

        if (!hasErrors) {
            let native = [] as NativeQuestion[]
            const generateKey = (): string => {
                let key = createRandomKey()
                for (let nativeQuestion of native) {
                    if (nativeQuestion.key !== '' && nativeQuestion.key === key) {
                        return generateKey()
                    }
                }
                return key
            }
            for (let question of questions) {
                native = [...native, {
                    key: generateKey(),
                    kind: clientToNativeKind(question.kind),
                    choices: question.choices,
                    question: question.question
                }]
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/survey`, {
                    method: 'POST',
                    //@ts-ignore
                    headers: {
                        Authorization: openToken,
                        'Content-Type': 'application/json',
                        'X-Flyght-Origin': origin ?? undefined
                    },
                    body: JSON.stringify(native)
                })
                if (!response.ok) {
                    try {
                        const {  error } = await response.json() as { code: number, error: string }
                        setErrors([error])
                    } catch (err) {
                        setErrors([
                            `Failed to save survey, unable to decipher. Server returned a status ${response.status} (${response.statusText}) code.`
                        ])
                    }
                    setSaving(false)
                    return
                }
                setUsedToken(true)
            } catch (err) {
                setErrors([`Failed to save survey: ${err}`])
            }
        }

        setSaving(false)
    }

    if (usedToken) {
        return <SurveySaved/>
    }

    return (
        <div className={"flex flex-col lg:flex-row gap-2 lg:gap-4 py-12 lg:px-24"}>
            <div className={"lg:sticky top-0 z-50 h-full"}>
                <div className={"flex flex-col gap-2"}>
                    <SurveyPrompt/>
                    <SurveyToolbar save={save} addQuestion={addQuestion}/>
                    <div>
                        {errors.length > 0 ? (
                            <SurveyErrorBlock title={"An error occurred while saving."}>
                                <div className={"font-light text-sm max-w-sm flex flex-col gap-2"}>
                                    {errors.map((error) => {
                                        return (
                                            <p className={"text-red-400"}>• {error}</p>
                                        )
                                    })}
                                </div>
                            </SurveyErrorBlock>
                        ) : null}
                        {(() => {
                            let { textBlocks, nonDecoratives } = calculateSizes()
                            return (
                                <>
                                    { textBlocks >= 2 ? (
                                        <SurveyErrorBlock title={"Maximum Text Blocks Reached"}>
                                            Currently, you can only add two (2) text blocks at maximum.
                                            We plan to improve our system even more and support even more characters, choices,
                                            questions and even more in the future!
                                        </SurveyErrorBlock>
                                    ) : null}
                                    {nonDecoratives >= 5 ? (
                                        <SurveyErrorBlock title={"Maximum Questions Reached"}>
                                            Currently, you can only add five (5) questions at maximum.
                                            We plan to improve our system even more and support even more characters, choices,
                                            questions and even more in the future!
                                        </SurveyErrorBlock>
                                    ) : null}
                                </>
                            )
                        })()}
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                {questions.map((question, index) => {
                    return (
                        <SurveyQuestion
                            key={question.kind+"-"+index}
                            index={index}
                            source={question}
                            onEdit={(copy) => setQuestions(prevState => {
                                let cpy = [...prevState]
                                cpy[index] = copy
                                return cpy
                            })}
                            onMove={(kind: 'up' | 'down') => move(kind === 'up', index)}
                            onDelete={() => removeIndex(index)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function InvalidLink() {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <p className={"text-2xl max-w-3xl font-light"}>
                    Oops, you cannot use the survey editor with an invalid link. Try generating
                    a proper link using the <span className={"text-blue-400 p-0.5 bg-zinc-900 bg-opacity-40 rounded"}>/survey edit</span> command
                    in the Discord bot of the server that you want to edit the survey of.
                </p>
            </section>
        </div>
    )
}

function ErrorMessage({ error }: { error: string }) {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <p className={"text-2xl max-w-3xl font-light"}>
                    Oops, something went wrong while trying to load the survey editor: {error}
                </p>
            </section>
        </div>
    )
}

function SurveySaved() {
    return (
        <div className="flex flex-col gap-2 py-12">
            <section id={"hero"} className={"flex flex-col gap-3"}>
                <div className={"flex flex-col gap-2 h-full relative border-zinc-800 backdrop-blur bg-opacity-30 border rounded p-8"}>
                    <div className={"heropattern-graphpaper-zinc-900/50 absolute h-full w-full top-0 left-0 -z-20"}></div>
                    <h3 className={`font-bold text-lg`}>Survey saved</h3>
                    <p className={"font-light text-sm"}>
                       We've saved the survey to your server. As the link is one-time use (for security purposes), you can no longer update
                        the server's survey in this page. If you still want to create some modifications to the survey
                        questions, please go to the Discord application and use the <span className={"text-blue-400 p-0.5 bg-zinc-900 bg-opacity-40 rounded"}>/survey edit</span> command
                        on the server that you want to edit the survey questions of.
                    </p>
                </div>
            </section>
        </div>
    )
}

function Loading() {
    return (
        <div className="flex flex-col gap-2 py-12 m-auto align-middle min-h-screen justify-center items-center">
            <section id={"hero"} className={"flex flex-col gap-3 animate-pulse"}>
                <Disc3 className={"animate-spin duration-700 transition ease-in-out w-12 h-12 select-none"}>Loading...</Disc3>
            </section>
        </div>
    )
}